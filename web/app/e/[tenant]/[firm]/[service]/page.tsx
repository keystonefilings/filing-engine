import { PublicIntake, publicTitle } from "@/components/PublicIntake";

/** A subscriber's firm's public page for one service (V39): /e/<account>/<firm>/<service>. */
export async function generateMetadata({ params }: { params: Promise<{ tenant: string; firm: string; service: string }> }) {
  const { tenant, firm, service } = await params;
  return { title: await publicTitle(tenant, firm, service) };
}

export default async function EnterprisePublicPage({ params }: { params: Promise<{ tenant: string; firm: string; service: string }> }) {
  const { tenant, firm, service } = await params;
  return <PublicIntake tenantId={tenant} firm={firm} service={service} />;
}
