export function getTotalBountyFund(fundData: any, paid: boolean): any {
  let funds = 0;
  fundData &&
    fundData.forEach((item: any) => {
      funds += paid
        ? item?.bounty?.wallet?.balance ?? 0
        : item?.wallet?.balance ?? 0;
    });
  return funds;
}
