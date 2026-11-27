import { PublicIntake, publicMetadata } from "@/components/PublicIntake";
import { platformTenant } from "@/lib/public-pages";

/** A partner firm's permanent page for one service (V19): /<firm>/<service>. */
export async function generateMetadata({ params }: { params: Promise<{ firm: string; service: string }> }) {
  const { firm, service } = await params;
  return publicMetadata(platformTenant(), firm, service);
}

export default async function PublicServicePage({ params }: { params: Promise<{ firm: string; service: string }> }) {
  const { firm, service } = await params;
  return <PublicIntake tenantId={platformTenant()} firm={firm} service={service} />;
}
