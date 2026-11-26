import Link from "next/link";
import { LoginForm } from "@/components/LoginForm";
import { platformName } from "@/lib/brand";
import { signIn } from "./actions";

export const metadata = { title: "Log in with an API key" };

export default function LoginPage() {
  return (
    <main className="wrap narrow stack">
      <h1>{platformName()} dashboard</h1>
      <p className="muted">Log in with one of your API keys to manage keys, webhooks, your firms&apos; portals and usage.</p>
      <LoginForm action={signIn} />
      <p className="small muted">Have an email and password? <Link href="/login">Log in here</Link> instead.</p>
    </main>
  );
}
