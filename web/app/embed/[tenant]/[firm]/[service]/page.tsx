import { PublicIntake, publicTitle } from "@/components/PublicIntake";

/** The website widget's frame (V39): the firm's form with no page chrome. The only pages that may be framed. */
export async function generateMetadata({ params }: { params: Promise<{ tenant: string; firm: string; service: string }> }) {
  const { tenant, firm, service } = await params;
  return { title: await publicTitle(tenant, firm, service) };
}

export default async function EmbedPage({ params }: { params: Promise<{ tenant: string; firm: string; service: string }> }) {
  const { tenant, firm, service } = await params;
  return <PublicIntake tenantId={tenant} firm={firm} service={service} embed />;
}
