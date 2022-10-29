import { useGetOrganization } from '@/hooks/organizationHooks';

export function OrganizationLink({
  orgName,
  className = 'font-medium text-main-light w-fit hover:underline',
}: {
  orgName: string;
  className?: string;
}) {
  const { organization } = useGetOrganization({name: orgName});

  return <></>;

  // return (
  //   <Link href={GoToOrgPage(organization?.id ? organization.id : '')}>
  //     <span className={`${className} capitalize`}>{orgName}</span>
  //   </Link>
  // );
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
