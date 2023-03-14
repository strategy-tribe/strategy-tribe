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

export function toPercentage(data: number, total: number): string {
  total = total === 0 ? 1 : total;
  const percentage = (data / total) * 100;
  return percentage > 0 ? percentage.toFixed(2) : '0';
}
