import { readFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument, StandardFonts, rgb, type PDFForm } from "pdf-lib";
import type { Address } from "../domain/filing.js";
import type { PaperUploadDetails } from "../domain/filing.js";

/**
 * Fills the New York Department of State fillable PDFs that E-Submission takes as an upload:
 *   DOS-1335-f  Application for Authority (foreign business corporation, BCL s.1304)
 *   DOS-1338-f  Certificate of Assumed Name (GBL s.130)
 * The blank forms are kept in assets/forms/ny. Field names were read from those files (Rev. 03/17).
 * Neither form has a signature field, so an approved signature image is drawn beside the printed
 * signature line. The filled form is flattened so it prints exactly as reviewed.
 */

export const NY_FORM_FILES = {
  ny_application_for_authority: "DOS-1335-f.pdf",
  ny_assumed_name: "DOS-1338-f.pdf",
} as const;

export type NyForm = keyof typeof NY_FORM_FILES;

export function formsDir(): string {
  return path.resolve(process.env.FORMS_DIR ?? "assets/forms/ny");
}

/** Where the signature image goes: page index and a box in PDF points (origin bottom left). */
export const SIGNATURE_BOX: Record<NyForm, { page: number; x: number; y: number; width: number; height: number }> = {
  // DOS-1335-f page 2: "X ____ (Signature)" with the line at y=396.
  ny_application_for_authority: { page: 1, x: 88, y: 397, width: 230, height: 34 },
  // DOS-1338-f page 1: "Signature:" label ends at x=368, line at y=84.
  ny_assumed_name: { page: 0, x: 372, y: 85, width: 220, height: 24 },
};

const LAW_OPTION: Record<string, string> = {
  business_corporation: "Business Corporation Law",
  limited_liability_company: "Limited Liability Company Law",
  religious_corporations: "Religious Corporations Law",
  education: "Education Law",
  not_for_profit_corporation: "Not-for-Profit Corporation",
  revised_limited_partnership: "Revised Limited Partnership",
  other: "Other",
};

const CAPACITY_OPTION: Record<string, string> = {
  authorized_person: "Authorized Person",
  officer: "Officer of the Corporation",
  general_partner: "General Partner",
  member: "Member of",
  manager: "Manager of the",
};

/** The 62 county boxes on DOS-1338-f, in the order they are numbered (Check Box1 = Albany). */
export const NY_1338_COUNTY_BOXES = [
  "Albany", "Allegany", "Bronx", "Broome", "Cattaraugus", "Cayuga", "Chautauqua", "Chemung", "Chenango", "Clinton",
  "Columbia", "Cortland", "Delaware", "Dutchess", "Erie", "Essex", "Franklin", "Fulton", "Genesee", "Greene", "Hamilton",
  "Herkimer", "Jefferson", "Kings", "Lewis", "Livingston", "Madison", "Monroe", "Montgomery", "Nassau", "New York",
  "Niagara", "Oneida", "Onondaga", "Ontario", "Orange", "Orleans", "Oswego", "Otsego", "Putnam", "Queens", "Rensselaer",
  "Richmond", "Rockland", "St. Lawrence", "Saratoga", "Schenectady", "Schoharie", "Schuyler", "Seneca", "Steuben",
  "Suffolk", "Sullivan", "Tioga", "Tompkins", "Ulster", "Warren", "Washington", "Wayne", "Westchester", "Wyoming", "Yates",
] as const;

const LOCATION_FIELDS = [
  "ADDRESS OF EACH LOCATION 1", "ADDRESS OF EACH LOCATION 2",
  "Address of each location (Number, Street, City, State, Zip Code)",
  ...[1, 2, 3, 4, 5, 6, 7].map((n) => `Address of each location (Number, Street, City, State, Zip Code) ${n}`),
];

export function oneLine(a: Address): string {
  return [a.street1, a.street2, `${a.city}, ${a.state} ${a.zip}`].filter(Boolean).join(", ");
}
function cityLine(a: Address): string { return `${a.city}, ${a.state} ${a.zip}`; }
function streetLine(a: Address): string { return [a.street1, a.street2].filter(Boolean).join(", "); }
function usDate(iso: string): string { const [y, m, d] = iso.split("-"); return `${m}/${d}/${y}`; }

/** Fields every fill must set, so a renamed field in a new revision of a form fails loudly. */
class Filler {
  constructor(private form: PDFForm) {}
  text(name: string, value: string | undefined) {
    if (value === undefined || value === "") return;
    const f = this.form.getTextField(name);
    const max = f.getMaxLength();
    if (max !== undefined && value.length > max) throw new Error(`"${value.slice(0, 30)}…" is longer than the form's ${name} box allows (${max})`);
    f.setText(value);
  }
  check(name: string, on: boolean) { if (on) this.form.getCheckBox(name).check(); }
  radio(name: string, wanted: string) {
    const g = this.form.getRadioGroup(name);
    // Export values on these forms carry stray trailing spaces ("Not-for-Profit Corporation ").
    const opt = g.getOptions().find((o) => o.trim() === wanted.trim());
    if (!opt) throw new Error(`"${wanted}" is not an option of ${name} (options: ${g.getOptions().map((o) => o.trim()).join(", ")})`);
    g.select(opt);
  }
}

export interface FillOptions {
  /** PNG of the signer's saved signature; only ever given for an approved filing (src/signatures/apply.ts). */
  signaturePng?: Buffer | null;
  /** Prints a "dry run, not for filing" band on every page. */
  dryRun?: boolean;
  /** For tests: the blank form bytes instead of reading assets/forms/ny. */
  blank?: Uint8Array;
}

export async function fillNyForm(details: PaperUploadDetails, opts: FillOptions = {}): Promise<Uint8Array> {
  const form = details.form;
  const doc = await PDFDocument.load(opts.blank ?? (await readFile(path.join(formsDir(), NY_FORM_FILES[form]))));
  const f = new Filler(doc.getForm());

  if (form === "ny_application_for_authority") {
    const a = details.applicationForAuthority;
    if (!a) throw new Error("applicationForAuthority answers are missing");
    f.text("Corporate Name", a.corporateName);
    f.text("Corporate Name2", a.corporateName);
    f.text("Corporate Name3", a.corporateName);
    f.text("Added to name", a.nameAddition);
    f.text("Fictitious name", a.fictitiousName);
    f.text("Jurisdiction", a.jurisdiction);
    f.text("Incorporation Date", usDate(a.incorporationDate));
    f.text("County in New York State", a.county);
    f.text("Process Address", [a.processRecipient.name, streetLine(a.processRecipient.address), cityLine(a.processRecipient.address)].join("\n"));
    f.radio("Group1", a.priorActivity === "none_in_new_york" ? "Choice1" : "Choice2");
    f.text("Name of Signer", a.signer.name);
    f.text("Title of Signer", a.signer.title);
    f.text("Name", a.filer.name);
    f.text("Company if Applicable", a.filer.company);
    f.text("Mailing Address", streetLine(a.filer.address));
    f.text("City State and Zip Code", cityLine(a.filer.address));
  } else {
    const n = details.assumedName;
    if (!n) throw new Error("assumedName answers are missing");
    f.text("Real Name of Entity", n.realName);
    f.text("1a FICTITIOUS NAME IF ANY OF FOREIGN ENTITY (Not Assumed Name)", n.foreignFictitiousName);
    f.radio("FORMED OR AUTHORIZED", LAW_OPTION[n.formedUnder]!);
    if (n.formedUnder === "other") f.text("Other (Specify Law)", n.otherLaw);
    f.text("Assumed Name", n.assumedName);
    f.check("PRINCIPAL PLACE", n.noNyPrincipalPlace);
    f.text("PRINCIPAL PLACE OF BUSINESS IN NEW YORK STATE MUST INCLUDE NUMBER AND STREET IF NONE CHECK THIS BOX", oneLine(n.principalPlace));
    if (n.counties === "all") f.check("CheckALL COUNTIES", true);
    else for (const c of n.counties) {
      const i = NY_1338_COUNTY_BOXES.indexOf(c as (typeof NY_1338_COUNTY_BOXES)[number]);
      if (i < 0) throw new Error(`unknown county ${c}`);
      f.check(`Check Box${i + 1}`, true);
    }
    f.check("Address-if none", n.noNyLocation);
    if (n.locations.length > LOCATION_FIELDS.length) throw new Error(`the form has room for ${LOCATION_FIELDS.length} locations`);
    n.locations.forEach((l, i) => f.text(LOCATION_FIELDS[i]!, oneLine(l)));
    f.text("Name of Signer", n.signer.name);
    f.radio("Capacity of Signer", CAPACITY_OPTION[n.signer.capacity]!);
    f.text("Name", n.filer.name);
    f.text("Company if Applicable", n.filer.company);
    f.text("Mailing Address", streetLine(n.filer.address));
    f.text("City State and Zip Code", cityLine(n.filer.address));
  }

  const helv = await doc.embedFont(StandardFonts.Helvetica);
  doc.getForm().updateFieldAppearances(helv);
  doc.getForm().flatten();

  if (opts.signaturePng && !opts.dryRun) {
    const img = await doc.embedPng(opts.signaturePng);
    const box = SIGNATURE_BOX[form];
    const scale = Math.min(box.width / img.width, box.height / img.height);
    const w = img.width * scale, h = img.height * scale;
    doc.getPage(box.page).drawImage(img, { x: box.x, y: box.y, width: w, height: h });
  }
  if (opts.dryRun) {
    const bold = await doc.embedFont(StandardFonts.HelveticaBold);
    for (const p of doc.getPages()) {
      const { width, height } = p.getSize();
      p.drawText("DRY RUN - NOT FOR FILING - UNSIGNED", { x: 36, y: height - 20, size: 10, font: bold, color: rgb(0.75, 0.1, 0.1) });
      void width;
    }
  }
  doc.setProducer("CoFile");
  doc.setModificationDate(new Date());
  return doc.save();
}

/** Signer named on the form, which the saved signature must match. */
export function formSignerName(details: PaperUploadDetails): string {
  return details.form === "ny_application_for_authority" ? details.applicationForAuthority?.signer.name ?? "" : details.assumedName?.signer.name ?? "";
}
