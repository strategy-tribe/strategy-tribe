export function OrgStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <span className="title-xs">{value}</span>
      <br />
      <span className="text-on-surface-unactive">{label}</span>
    </div>
  );
}
