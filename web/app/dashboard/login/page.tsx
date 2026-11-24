import { LoginForm } from "@/components/LoginForm";
import { platformName } from "@/lib/brand";
import { signIn } from "./actions";

export const metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main className="wrap narrow stack">
      <h1>{platformName()} dashboard</h1>
      <p className="muted">Sign in with one of your API keys to manage keys, webhooks, your firms&apos; portals and usage.</p>
      <LoginForm action={signIn} />
    </main>
  );
}
