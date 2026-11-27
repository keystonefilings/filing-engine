import Link from "next/link";
import { betaOn } from "@/lib/beta";
import { Chip } from "@/components/ui/Chip";
import "@/styles/components/public-beta.css";

export function PublicBetaNotice() {
  if (!betaOn()) return null;

  return (
    <div className="public2-beta" role="note">
      <div className="public2-beta-in">
        <Chip tone="rehearsal" compact>Beta</Chip>
        <p>Try a free rehearsal. Nothing is filed or paid. <Link href="/what-we-file#live">About rehearsals</Link></p>
      </div>
    </div>
  );
}
