export const prefetchExploreQueries = async () => {
  // const queryClient = new QueryClient();
  // const moralis_serverUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  // const moralis_appId = process.env.NEXT_PUBLIC_APP_ID;
  // await moralisInstance.start({
  //   serverUrl: moralis_serverUrl,
  //   appId: moralis_appId,
  // });
  // //*Closes soon query
  // const qClosesSoon: BountyQueryParams = {
  //   order: Order.Asc,
  //   orderBy: BountyOrderBy.ClosesAt,
  //   amount: 5,
  // };
  // const { fetch: fetchClosesSoon, id: closesSoon } = CreateBountyQuery(
  //   qClosesSoon,
  //   moralisInstance
  // );
  // //*Low competition query
  // const qLowCompetition: BountyQueryParams = {
  //   order: Order.Asc,
  //   orderBy: BountyOrderBy.Submissions,
  //   amount: 5,
  // };
  // const { fetch: fetchLowCompetition, id: lowCompetition } = CreateBountyQuery(
  //   qLowCompetition,
  //   moralisInstance
  // );
  //*Latest bounties query
  // const qLatest: BountyQueryParams = {
  //   order: Order.Asc,
  //   orderBy: BountyOrderBy.CreatedAt,
  //   amount: 15,
  // };
  // const { fetch: fetchLatest, id: latest } = CreateBountyQuery(
  //   qLatest,
  //   moralisInstance
  // );
  // //*Top ind bounties
  // const qIndividual: BountyQueryParams = {
  //   order: Order.Desc,
  //   orderBy: BountyOrderBy.Bounty,
  //   targetType: TargetType.Individual,
  //   amount: 5,
  // };
  // const { fetch: fetchIndividuals, id: individuals } = CreateBountyQuery(
  //   qIndividual,
  //   moralisInstance
  // );
  // //*Top org bounties
  // const qOrg: BountyQueryParams = {
  //   order: Order.Desc,
  //   orderBy: BountyOrderBy.Bounty,
  //   targetType: TargetType.Organization,
  //   amount: 5,
  // };
  // const { fetch: fetchOrgBounties, id: orgBounties } = CreateBountyQuery(
  //   qOrg,
  //   moralisInstance
  // );
  // //!End
  // await Promise.all([
  //   queryClient.prefetchQuery(latest, () => fetchLatest()),
  //   // queryClient.prefetchQuery(closesSoon, () => fetchClosesSoon()),
  //   // queryClient.prefetchQuery(lowCompetition, () => fetchLowCompetition()),
  //   // queryClient.prefetchQuery(individuals, () => fetchIndividuals()),
  //   // queryClient.prefetchQuery(orgBounties, () => fetchOrgBounties()),
  // ]);
  // return queryClient;
};
