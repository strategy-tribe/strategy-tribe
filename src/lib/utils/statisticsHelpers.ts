import { PaidBountiesData } from '@/server/routes/statistics/getPaidBounties';
import { TotalBountyFundData } from '@/server/routes/statistics/getTotalBountiesFund';

export type TrendChartData = {
  totalBountyFunding: PaidBountiesData;
  bountyAmountPaid: TotalBountyFundData;
  labels: string[];
};

export function getDates(labels: boolean): any {
  const prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  const dates = [];
  const dateArray = [];
  for (let i = 6; i >= 0; i--) {
    const date = Number(prevMonday) - 7 * i * 24 * 60 * 60 * 1000;
    dateArray.push(new Date(date).toLocaleDateString('en-GB'));
    const dateValue = new Date(date).setUTCHours(0, 0, 0, 0);
    dates.push(dateValue);
  }
  return !labels ? dates : dateArray;
}

export function calculateTotalBountyFund(
  fundData: any,
  paid: boolean
): number[] {
  let fundsTill7Weeks = 0,
    fundsTill6Weeks = 0,
    fundsTill5Weeks = 0,
    fundsTill4Weeks = 0,
    fundsTill3Weeks = 0,
    fundsTill2Weeks = 0,
    fundsTill1Weeks = 0;
  const dateValue = paid ? 'paidDate' : 'updatedAt';
  const dates = getDates(false);
  fundData &&
    fundData.forEach((item: any) => {
      const amount = paid
        ? item?.bounty?.wallet?.balance ?? 0
        : item?.wallet?.balance ?? 0;
      if (new Date(item[dateValue])?.getTime() < dates[0]) {
        fundsTill7Weeks += amount;
      } else {
        if (new Date(item[dateValue])?.getTime() < dates[1]) {
          fundsTill6Weeks += amount;
        } else if (new Date(item[dateValue])?.getTime() < dates[2]) {
          fundsTill5Weeks += amount;
        } else if (new Date(item[dateValue])?.getTime() < dates[3]) {
          fundsTill4Weeks += amount;
        } else if (new Date(item[dateValue])?.getTime() < dates[4]) {
          fundsTill3Weeks += amount;
        } else if (new Date(item[dateValue])?.getTime() < dates[5]) {
          fundsTill2Weeks += amount;
        } else if (new Date(item[dateValue])?.getTime() < dates[6]) {
          fundsTill1Weeks += amount;
        }
      }
    });
  const result = [
    fundsTill6Weeks,
    fundsTill5Weeks,
    fundsTill4Weeks,
    fundsTill3Weeks,
    fundsTill2Weeks,
    fundsTill1Weeks,
  ];
  const cumulativeSum = (
    (sum) => (value: any) =>
      (sum += value)
  )(0);
  const finalArray = result.map(cumulativeSum);
  const totalDataLastWeek = finalArray.map((item) => item + fundsTill7Weeks);
  const finalResult = [fundsTill7Weeks].concat(totalDataLastWeek);
  return finalResult;
}
