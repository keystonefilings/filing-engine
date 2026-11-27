/**
 * The site's photographs (merged spec 7; supplied by the owner, Nov 26): staged scenes with fictional firms and
 * people, as web crops in public/cofile/photography. Sizes from the package's image-sizes.json, so every image
 * reserves its box before it loads. The masters stay outside git (var/photography).
 * Day and dusk crops of the blank plate share their framing, so a page can swap them with the color scheme.
 */
export interface Photo { src: string; width: number; height: number }

export const PHOTOS = {
  "c01-harbor-pine-door-mobile": { src: "/cofile/photography/c01-harbor-pine-door-mobile.webp", width: 960, height: 720 },
  "c01-harbor-pine-door": { src: "/cofile/photography/c01-harbor-pine-door.webp", width: 1040, height: 1300 },
  "c01-harbor-pine-entrance": { src: "/cofile/photography/c01-harbor-pine-entrance.webp", width: 1440, height: 960 },
  "c02-northgate-door-mobile": { src: "/cofile/photography/c02-northgate-door-mobile.webp", width: 960, height: 720 },
  "c02-northgate-door": { src: "/cofile/photography/c02-northgate-door.webp", width: 1040, height: 1300 },
  "c03-close-day-mobile": { src: "/cofile/photography/c03-close-day-mobile.webp", width: 680, height: 850 },
  "c03-close-day": { src: "/cofile/photography/c03-close-day.webp", width: 1824, height: 798 },
  "c03-signup-strip-day": { src: "/cofile/photography/c03-signup-strip-day.webp", width: 672, height: 378 },
  "c04-close-dusk-mobile": { src: "/cofile/photography/c04-close-dusk-mobile.webp", width: 680, height: 850 },
  "c04-close-dusk": { src: "/cofile/photography/c04-close-dusk.webp", width: 1824, height: 798 },
  "c04-signup-strip-dusk": { src: "/cofile/photography/c04-signup-strip-dusk.webp", width: 672, height: 378 },
  "c05-bakery-wide": { src: "/cofile/photography/c05-bakery-wide.webp", width: 1440, height: 960 },
  "c05-phone-detail-mobile": { src: "/cofile/photography/c05-phone-detail-mobile.webp", width: 1080, height: 720 },
  "c05-phone-detail": { src: "/cofile/photography/c05-phone-detail.webp", width: 960, height: 1200 },
  "c06-desk-mobile": { src: "/cofile/photography/c06-desk-mobile.webp", width: 864, height: 1080 },
  "c06-desk": { src: "/cofile/photography/c06-desk.webp", width: 1440, height: 1080 },
  "c06-envelope-email": { src: "/cofile/photography/c06-envelope-email.jpg", width: 960, height: 720 },
  "c06-papers-returned": { src: "/cofile/photography/c06-papers-returned.webp", width: 1440, height: 1080 },
  "c07-rehearsal-mobile": { src: "/cofile/photography/c07-rehearsal-mobile.webp", width: 800, height: 1000 },
  "c07-rehearsal-wide": { src: "/cofile/photography/c07-rehearsal-wide.webp", width: 1890, height: 810 },
  "c07-rehearsal": { src: "/cofile/photography/c07-rehearsal.webp", width: 1230, height: 820 },
  "c08-approval-mobile": { src: "/cofile/photography/c08-approval-mobile.webp", width: 800, height: 1000 },
  "c08-approval": { src: "/cofile/photography/c08-approval.webp", width: 1440, height: 960 },
  "c09-printers-proof": { src: "/cofile/photography/c09-printers-proof.webp", width: 960, height: 1200 },
  "c11-engravers-bench-mobile": { src: "/cofile/photography/c11-engravers-bench-mobile.webp", width: 800, height: 1000 },
  "c11-engravers-bench": { src: "/cofile/photography/c11-engravers-bench.webp", width: 1440, height: 960 },
} as const satisfies Record<string, Photo>;

export type PhotoName = keyof typeof PHOTOS;

/**
 * Where the typed firm name sits on the blank plate, as a box in percent of each crop (the package's plate
 * registration): the Close at 16:7, the tall phone view at 4:5, and the sign-up strip at 16:9.
 */
export const PLATE_BOX = {
  close: { left: 70.2, top: 43.7, width: 21.3, height: 10.4 },
  tall: { left: 21.6, top: 44.1, width: 57.2, height: 9.8 },
  strip: { left: 21.3, top: 39.7, width: 57.9, height: 22.0 },
} as const;
