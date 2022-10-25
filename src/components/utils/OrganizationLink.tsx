import { useGetOrganizationByName } from '@/hooks/organizationHooks';

export function OrganizationLink({
  orgName,
  className = 'text-main-light font-medium w-fit hover:underline',
}: {
  orgName: string;
  className?: string;
}) {
  const { organization } = useGetOrganizationByName(orgName);

  return <></>;

  // return (
  //   <Link href={GoToOrgPage(organization?.id ? organization.id : '')}>
  //     <a className={`${className} capitalize`}>{orgName}</a>
  //   </Link>
  // );
}

export function BountyLink({
  bountyId: bountyId,
  className = 'text-main-light font-medium w-fit hover:underline',
}: {
  bountyId: string;
  className?: string;
}) {
  // const { bounty } = useGetBounty(bountyId);

  return <></>;

  // return (
  //   <Link href={GoToBountyPage(bounty.id)}>
  //     <a className={className}>{bountyId}</a>
  //   </Link>
  // );
}
