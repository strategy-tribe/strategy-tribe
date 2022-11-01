import { useGetOrganization } from "@/lib/hooks/organizationHooks";
import { GoToOrgPage } from "@/lib/utils/Routes";
import Link from 'next/link';

export function OrganizationLink({
  orgId,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  orgId: string;
  className?: string;
}) {
  const { organization } = useGetOrganization({id: orgId});

  return (
    <Link href={GoToOrgPage(organization?.id ? organization.id : '')}>
      <span className={`${className} capitalize`}>{organization.name}</span>
    </Link>
  );
}

export function BountyLink({
  bountyId: bountyId,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  bountyId: string;
  className?: string;
}) {
  // const { bounty } = useGetBounty(bountyId);

  return <></>;

  // return (
  //   <Link href={GoToBountyPage(bounty.id)}>
  //     <span className={className}>{bountyId}</span>
  //   </Link>
  // );
}
