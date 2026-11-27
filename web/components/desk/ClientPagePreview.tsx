import { brandStyle, type FirmBrand } from "@/lib/firm";
import { Letterhead, Register, Sheet } from "@/components/ui/Sheet";

/**
 * A picture of the firm's own client page, drawn live from its brand at the phone layout (merged spec 10B.4.2, 10B.7):
 * its Letterhead and Firm Rule, the filing type's title in its font, empty fields and Rule bars where the form would
 * be (never invented text), and its button. Register 2 inside CoFile's page, with nothing of CoFile on it. A picture,
 * not a link.
 */
export function ClientPagePreview({ brand, title, label, width = 360, crop = 440 }: { brand: FirmBrand; title: string; label: string; width?: number; crop?: number }) {
  return (
    <div className="preview2" role="img" aria-label={label} style={{ width, maxWidth: "100%", height: crop }}>
      <Register value="firm" firmStyle={brandStyle(brand)} className="preview2-page">
        <Sheet size="page" className="preview2-sheet">
          <Letterhead name={brand.name} logoUrl={brand.logoUrl} logo={brand.logo} preview />
          <p className="preview2-title">{title}</p>
          <span className="preview2-bar" style={{ width: "86%" }} />
          <span className="preview2-bar" style={{ width: "64%" }} />
          <span className="preview2-label" />
          <span className="preview2-field" />
          <span className="preview2-label" style={{ width: "42%" }} />
          <span className="preview2-field" />
          <span className="preview2-button">Send to {brand.name}</span>
        </Sheet>
      </Register>
    </div>
  );
}
