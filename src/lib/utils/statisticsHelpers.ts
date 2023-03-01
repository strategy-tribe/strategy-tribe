import { AvgSubmissionPayoutData } from '../../server/routes/statistics/getAvgSubmissionPayout';
import { BountiesStatusData } from '../../server/routes/statistics/getBountiesStatus';
import { LastWeekTotalBountyFundData } from '../../server/routes/statistics/getLastWeekTotalBountiesFund';
import { SubmissionsStatusData } from '../../server/routes/statistics/getSubmissionsStatus';

export type BountyStatus = {
  total: number;
  openBounties: number;
  closedBounties: number;
  waitingForFundsBounties: number;
};

export function getBountyStatusData(
  parsedbountyStatusData: BountiesStatusData
): BountyStatus {
  const total = parsedbountyStatusData?.length;
  let openBounties = 0;
  let closedBounties = 0;
  let waitingForFundsBounties = 0;

  parsedbountyStatusData &&
    parsedbountyStatusData.forEach((item: BountiesStatusData) => {
      switch (item.status) {
        case 'Open':
          openBounties++;
          break;
        case 'Closed':
          closedBounties++;
          break;
        case 'WaitingForFunds':
          waitingForFundsBounties++;
          break;
        default:
          break;
      }
    });
  const processedBountiesStatusData = {
    total: total,
    openBounties: openBounties,
    closedBounties: closedBounties,
    waitingForFundsBounties: waitingForFundsBounties,
  };
  return processedBountiesStatusData;
}

export type SubmissionsData = {
  total: number;
  acceptedSubmissions: number;
  rejectedSubmissions: number;
  waitingForReviewSubmissions: number;
  typesOfData: {
    walletCount: number;
    nameCount: number;
    domainCount: number;
    emailCount: number;
  };
};

export function getSubmissionsData(
  parsedSubmissionStatesData: SubmissionsStatusData
): SubmissionsData {
  const totalSubmissions = parsedSubmissionStatesData?.length;
  let acceptedSubmissions = 0;
  let rejectedSubmissions = 0;
  let waitingForReviewSubmissions = 0;
  let walletCount = 0;
  let nameCount = 0;
  let domainCount = 0;
  let emailCount = 0;
  parsedSubmissionStatesData &&
    parsedSubmissionStatesData.forEach((item: any) => {
      const submittedData = item.answers;
      switch (item.state) {
        case 'Accepted':
          acceptedSubmissions++;
          break;
        case 'Rejected':
          rejectedSubmissions++;
          break;
        case 'WaitingForReview':
          waitingForReviewSubmissions++;
          break;
        default:
          break;
      }
      submittedData &&
        submittedData.forEach((data: any) => {
          if (data?.requirement?.type === 'Wallet') {
            walletCount++;
          }
          if (data?.requirement?.type === 'Name') {
            nameCount++;
          }
          if (data?.requirement?.type === 'Domain') {
            domainCount++;
          }
          if (data?.requirement?.type === 'Email') {
            emailCount++;
          }
        });
    });
  const processedSubmissionStatesData = {
    total: totalSubmissions,
    acceptedSubmissions: acceptedSubmissions,
    rejectedSubmissions: rejectedSubmissions,
    waitingForReviewSubmissions: waitingForReviewSubmissions,
    typesOfData: {
      walletCount: walletCount,
      nameCount: nameCount,
      domainCount: domainCount,
      emailCount: emailCount,
    },
  };
  return processedSubmissionStatesData;
}

export function getAvgSubmissionPayoutData(
  submissionPayoutData: AvgSubmissionPayoutData
): number {
  let totalBountyPaidInMatics = 0;
  const totalPaidBounties = submissionPayoutData?.length || 0;
  submissionPayoutData &&
    submissionPayoutData.forEach((item: any) => {
      totalBountyPaidInMatics =
        totalBountyPaidInMatics + item?.bounty?.wallet?.balance;
    });
  const avgSubmissionPayout = totalBountyPaidInMatics / totalPaidBounties;
  return avgSubmissionPayout;
}

export function getLastWeekDates(): string[] {
  let dateArray: string[] = [];
  for (let i = 0; i < 7; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dateArray.push(date.toLocaleDateString());
  }
  dateArray = dateArray.reverse();
  return dateArray;
}

export function getLastWeekBountyPaidData(
  trendData: AvgSubmissionPayoutData
): number[] {
  const bountyAmountPaid: number[] = [];
  const dateArray = getLastWeekDates();
  dateArray &&
    dateArray.forEach((date: any) => {
      let amt = 0;
      trendData &&
        trendData.forEach((item: any) => {
          if (item.paidDate.toLocaleDateString() === date) {
            amt = amt + item.bounty?.wallet?.balance;
          }
        });
      bountyAmountPaid.push(amt);
    });
  return bountyAmountPaid;
}

export function getLastWeekTotalBountiesFundData(
  lastWeekFundData: LastWeekTotalBountyFundData,
  bountyAmount: number
): number[] {
  const totalFunds: number[] = [];
  const dateArray = getLastWeekDates();
  dateArray &&
    dateArray.forEach((date: any) => {
      let amt = 0;
      lastWeekFundData &&
        lastWeekFundData.forEach((item: any) => {
          if (item.updatedAt.toLocaleDateString() === date) {
            amt = amt + item.balance;
          }
        });
      totalFunds.push(amt);
    });
  const cumulativeSum = (
    (sum) => (value) =>
      (sum += value)
  )(0);
  const finalArray = totalFunds.map(cumulativeSum);
  const totalFundsLastWeek = finalArray.map((item) => item + bountyAmount);
  return totalFundsLastWeek;
}

export type TrendChartData = {
  totalBountyFunding: number[];
  bountyAmountPaid: number[];
};
