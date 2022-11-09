import { OrganizationLink } from './OrganizationLink';

export default function FromOrganization({
  orgName,
  title = ' Related to',
}: {
  orgName: string;
  title?: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="label text-on-surface-unactive">{title}</span>
      <OrganizationLink orgName={orgName} />
    </div>
  );
}
