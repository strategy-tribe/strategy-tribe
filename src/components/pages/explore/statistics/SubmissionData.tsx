import { PieChart } from 'react-minimal-pie-chart';

import { useExploreContext } from '../ExploreContext';

export default function SubmissionData() {
  const { submissionStatesData } = useExploreContext();
  let walletPercentage = 0;
  let namePercentage = 0;
  let domainPercentage = 0;
  let emailPercentage = 0;
  const total =
    submissionStatesData?.typesOfData?.walletCount +
    submissionStatesData?.typesOfData?.nameCount +
    submissionStatesData?.typesOfData?.domainCount +
    submissionStatesData?.typesOfData?.emailCount;
  walletPercentage = (
    (submissionStatesData.typesOfData.walletCount / total) *
    100
  ).toFixed(2);
  namePercentage = (
    (submissionStatesData.typesOfData.nameCount / total) *
    100
  ).toFixed(2);
  domainPercentage = (
    (submissionStatesData.typesOfData.domainCount / total) *
    100
  ).toFixed(2);
  emailPercentage = (
    (submissionStatesData.typesOfData.emailCount / total) *
    100
  ).toFixed(2);
  if (!submissionStatesData) return <></>;
  return (
    <div className="mt-6 flex h-52 w-full flex-col rounded-md border px-6 pt-4">
      <span>Data Submissions</span>
      <div className="flex flex-row">
        <div className="w-3/5 pt-0">
          <PieChart
            style={{ height: '155px', marginLeft: '-15%' }}
            data={[
              {
                title: 'Wallet',
                value: submissionStatesData.typesOfData.walletCount,
                color: '#C7CEFF',
              },
              {
                title: 'Name',
                value: submissionStatesData.typesOfData.nameCount,
                color: '#7357F6',
              },
              {
                title: 'Domain',
                value: submissionStatesData.typesOfData.domainCount,
                color: '#172B53',
              },
              {
                title: 'Email',
                value: submissionStatesData.typesOfData.emailCount,
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
                style={{ ['background-color' as any]: `#C7CEFF` }}
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
                style={{ ['background-color' as any]: `#7357F6` }}
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
                style={{ ['background-color' as any]: `#172B53` }}
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
                style={{ ['background-color' as any]: `#4E29B8` }}
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
