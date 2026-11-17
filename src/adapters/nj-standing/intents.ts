import type { ScreenIntents } from "../../resolver/types.js";

/**
 * NJ Business Records Service, Standing Certificates
 * (njportal.com/dor/businessrecords/EntityDocs/StandingCerts.aspx). ASP.NET WebForms:
 * choosing a search type and editing the name both post the page back.
 * Labels from the live walk of 2026-11-17 (signed out; public record; cart emptied).
 */
const SEARCH_TYPE = { key: "searchType", labels: ["Search Type"], kinds: ["radio" as const], required: true };

export const NJ_STANDING_SCREENS = {
  searchType: {
    screenKey: "nj.standing.search_type",
    title: "Standing Certificates: search type",
    intents: [SEARCH_TYPE],
  },
  searchName: {
    screenKey: "nj.standing.search_name",
    title: "Standing Certificates: business name",
    intents: [SEARCH_TYPE, { key: "businessName", labels: ["Business Name"], kinds: ["text" as const], required: true }],
  },
  results: {
    screenKey: "nj.standing.results",
    title: "Standing Certificates: search results",
    intents: [],
    // One checkbox per form per matching entity, labelled "<form column>: <entity name>".
    dynamicFields: ["^Short Form", "^Long Form"],
  },
  cart: {
    screenKey: "nj.standing.cart",
    title: "Cart",
    intents: [
      { key: "paymentType", labels: ["Select Payment Type"], kinds: ["select" as const], required: true, note: "---- Select ---- / Credit Card / E-Check; service fee appears after choosing" },
    ],
  },
} satisfies Record<string, ScreenIntents>;

/** Results-grid column headers, as live ("?" is the help icon's text). */
export const NJ_STANDING_FORM_COLUMN = {
  short: "Short Form",
  long_filing_history: "Long Form w/Filing History",
  long_officers: "Long Form w/Officers",
} as const;
