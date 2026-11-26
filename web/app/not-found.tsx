import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <main className="wrap" style={{ maxWidth: 560, paddingTop: 64 }}>
      <h1>Page not found</h1>
      <p>The link may be old or mistyped.</p>
      <p><Link className="btn" href="/">Go to the home page</Link></p>
    </main>
  );
}
