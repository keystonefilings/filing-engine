import { statusLabel } from "@/lib/status";

export function StatusBadge({ status }: { status: string }) {
  const { label, tone } = statusLabel(status);
  return <span className={`badge ${tone}`}>{label}</span>;
}
