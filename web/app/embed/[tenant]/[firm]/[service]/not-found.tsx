import "@/styles/components/embed.css";

/**
 * Inside the website widget, a page that doesn't exist (wrong firm, a service not offered, not public) shows the
 * product's own line on the white sheet and nothing else: never the site's 404, with CoFile's header, inside someone
 * else's website (merged spec 10C.19).
 */
export default function EmbedUnavailable() {
  return <main className="embed2-gone"><p>This page isn&apos;t available any more.</p></main>;
}
