export const metadata = { title: "Signed out" };

export default function SignedOut() {
  return (
    <main className="wrap narrow">
      <h1>You&apos;re not signed in to this portal</h1>
      <p>If you have a partner account, <a href="/login">log in here</a>.</p>
      <p>Otherwise open the invite link your filing company sent you. Invite links work for 7 days; if yours has run out, ask them for a new one.</p>
    </main>
  );
}
