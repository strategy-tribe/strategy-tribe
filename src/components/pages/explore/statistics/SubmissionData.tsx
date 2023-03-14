import { PieChart } from 'react-minimal-pie-chart';

import { toPercentage } from '@/lib/utils/statisticsHelpers';

import { useExploreContext } from '../ExploreContext';

export default function SubmissionData() {
  const { submissionStatesData } = useExploreContext();
  const total =
    (submissionStatesData?.typesOfData?.walletCount ?? 0) +
    (submissionStatesData?.typesOfData?.nameCount ?? 0) +
    (submissionStatesData?.typesOfData?.domainCount ?? 0) +
    (submissionStatesData?.typesOfData?.emailCount ?? 0);
  const walletPercentage = toPercentage(
    submissionStatesData?.typesOfData?.walletCount ?? 0,
    total
  );
  const namePercentage = toPercentage(
    submissionStatesData?.typesOfData?.nameCount ?? 0,
    total
  );
  const domainPercentage = toPercentage(
    submissionStatesData?.typesOfData?.domainCount ?? 0,
    total
  );
  const emailPercentage = toPercentage(
    submissionStatesData?.typesOfData?.emailCount ?? 0,
    total
  );
  if (!submissionStatesData) return <></>;
  return (
    <div className="mt-7 flex h-52 w-full flex-col rounded-md border px-6 pt-4">
      <span>Data Submissions</span>
      <div className="flex flex-row">
        <div className="w-3/5 pt-0">
          <PieChart
            style={{ height: '155px', marginLeft: '-15%' }}
            data={[
              {
                title: 'Wallet',
                value: submissionStatesData.typesOfData.walletCount ?? 0,
                color: '#C7CEFF',
              },
              {
                title: 'Name',
                value: submissionStatesData.typesOfData.nameCount ?? 0,
                color: '#7357F6',
              },
              {
                title: 'Domain',
                value: submissionStatesData.typesOfData.domainCount ?? 0,
                color: '#172B53',
              },
              {
                title: 'Email',
                value: submissionStatesData.typesOfData.emailCount ?? 0,
                color: '#4E29B8',
              },
            ]}
            lineWidth={25}
            radius={40}
            rounded
          />
        </div>
        <div className="flex w-2/5 flex-col gap-2 pt-10 text-xs">
          <div className="flex w-full flex-row">
            <div className="flex w-3/4 flex-row">
              <span
                className="mt-0.5 h-2	w-2 rounded-full"
                style={{ ['backgroundColor' as any]: `#C7CEFF` }}
              ></span>
              <span className="pl-1">Wallet</span>
            </div>
            <div className="flex w-1/4">
              <span>{walletPercentage}%</span>
            </div>
          </div>
          <div className="flex w-full flex-row">
            <div className="flex w-3/4 flex-row">
              <span
                className="mt-0.5 h-2	w-2 rounded-full"
                style={{ ['backgroundColor' as any]: `#7357F6` }}
              ></span>
              <span className="pl-1">Name</span>
            </div>
            <div className="flex w-1/4">
              <span>{namePercentage}%</span>
            </div>
          </div>
          <div className="flex w-full flex-row">
            <div className="flex w-3/4 flex-row">
              <span
                className="mt-0.5 h-2	w-2 rounded-full"
                style={{ ['backgroundColor' as any]: `#172B53` }}
              ></span>
              <span className="pl-1">Domain</span>
            </div>
            <div className="flex w-1/4">
              <span>{domainPercentage}%</span>
            </div>
          </div>
          <div className="flex w-full flex-row">
            <div className="flex w-3/4 flex-row">
              <span
                className="mt-0.5 h-2	w-2 rounded-full"
                style={{ ['backgroundColor' as any]: `#4E29B8` }}
              ></span>
              <span className="pl-1">Email</span>
            </div>
            <div className="flex w-1/4">
              <span>{emailPercentage}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
