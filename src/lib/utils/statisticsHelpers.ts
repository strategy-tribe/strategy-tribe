import { AvgSubmissionPayoutData } from '../../server/routes/statistics/getAvgSubmissionPayout';
import { BountiesStatusData } from '../../server/routes/statistics/getBountiesStatus';
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
    parsedbountyStatusData.forEach((item: any) => {
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
        totalBountyPaidInMatics + item?.bounty?.wallet?.balance ?? 0;
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

export function totalPaidBounties(totalPaid: AvgSubmissionPayoutData): number {
  let sum = 0;
  totalPaid &&
    totalPaid.forEach((element: any) => {
      sum = sum + (element?.bounty?.wallet?.balance ?? 0);
    });
  return sum;
}

export function getTimeFromDate(): any {
  const prevMonday = new Date();
  prevMonday.setDate(prevMonday.getDate() - ((prevMonday.getDay() + 6) % 7));
  const dates = [];
  for (let i = 6; i >= 0; i--) {
    const date = Number(prevMonday) - 7 * i * 24 * 60 * 60 * 1000;
    const dateValue = new Date(date).setUTCHours(0, 0, 0, 0);
    dates.push(dateValue);
  }
  return dates;
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
  const dates = getTimeFromDate();
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
  return [fundsTill7Weeks].concat(totalDataLastWeek);
}

export type TrendChartData = {
  totalBountyFunding: number[];
  bountyAmountPaid: number[];
};
