import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PieChart } from 'react-minimal-pie-chart';

import { useExploreContext } from '../ExploreContext';
Chart.register(...registerables);

export default function BountiesStatus() {
  const { bountyStatusData, bountyTrendChartData } = useExploreContext();
  let openBountiesPercentage = 0;
  let closedBountiesPercentage = 0;
  let waitingFundsBountiesPercentage = 0;
  openBountiesPercentage = (
    (bountyStatusData?.openBounties / bountyStatusData?.total) *
    100
  ).toFixed(2);
  closedBountiesPercentage = (
    (bountyStatusData?.closedBounties / bountyStatusData?.total) *
    100
  ).toFixed(2);
  waitingFundsBountiesPercentage = (
    (bountyStatusData?.waitingForFundsBounties / bountyStatusData?.total) *
    100
  ).toFixed(2);
  const labels = ['', '', '', '', '', '', ''];

  const data = {
    labels,
    datasets: [
      {
        label: 'Total bounty funding',
        data: bountyTrendChartData.totalBountyFunding,
        borderColor: '#E6E8EC',
        backgroundColor: '#E6E8EC',
      },
      {
        label: 'Bounty amount paid',
        data: bountyTrendChartData.bountyAmountPaid,
        borderColor: '#5A6ACF',
        backgroundColor: '#5A6ACF',
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (!bountyStatusData && !bountyTrendChartData) return <></>;
  return (
    <div className="flex flex-col tablet:w-3/4">
      <span className="flex flex-row">Bounties</span>
      <div className="pt-0">
        <PieChart
          style={{ height: '210px' }}
          data={[
            {
              title: 'Open',
              value: bountyStatusData?.openBounties,
              color: '#C7CEFF',
            },
            {
              title: 'Closed',
              value: bountyStatusData?.closedBounties,
              color: '#8593ED',
            },
            {
              title: 'Waiting For Funds',
              value: bountyStatusData?.waitingForFundsBounties,
              color: '#3D4AA1',
            },
          ]}
          lineWidth={20}
          radius={48}
        />
      </div>
      <div className="flex w-full flex-row space-x-1 pl-5 pr-5 pt-3 text-xs">
        <div className="flex basis-1/3 flex-col justify-items-center">
          <div className="flex flex-row">
            <span className="h-4 w-4 rounded-full	bg-open-bounty"></span>
            <span className="pl-1">Open</span>
          </div>
          <div className="flex pt-1 pl-5">
            <span className="space-x-1">{openBountiesPercentage}%</span>
          </div>
        </div>
        <div className="flex basis-1/3 flex-col justify-items-center">
          <div className="flex flex-row">
            <span className="h-4 w-4 rounded-full	bg-close-bounty"></span>
            <span className="pl-1">Closed</span>
          </div>
          <div className="flex pt-1 pl-5">
            <span className="space-x-1">{closedBountiesPercentage}%</span>
          </div>
        </div>
        <div className="flex basis-1/3 flex-col justify-items-center">
          <div className="flex flex-row">
            <span className="h-4 w-4 rounded-full	bg-wait-bounty"></span>
            <span className="pl-1">Waiting For Funds</span>
          </div>
          <div className="flex pt-1 pl-5">
            <span className="space-x-1">{waitingFundsBountiesPercentage}%</span>
          </div>
        </div>
      </div>
      <div className="pt-6 pb-4">
        <span className="flex flex-row pb-3">Trend</span>
        <div className="h-64">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
