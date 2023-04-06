import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { PieChart } from 'react-minimal-pie-chart';

import { useExploreContext } from '../ExploreContext';
Chart.register(...registerables);

export default function BountiesStatus() {
  const { bountyStatusData, bountyTrendChartData } = useExploreContext();
  const total = bountyStatusData?.total ?? 0;
  const openBountiesPercentage: number | undefined | string = (
    ((bountyStatusData?.openBounties ?? 0) / total) *
    100
  ).toFixed(2);
  const closedBountiesPercentage: number | undefined | string = (
    ((bountyStatusData?.closedBounties ?? 0) / total) *
    100
  ).toFixed(2);
  const waitingFundsBountiesPercentage: number | undefined | string = (
    ((bountyStatusData?.waitingForFundsBounties ?? 0) / total) *
    100
  ).toFixed(2);
  const labels = bountyTrendChartData?.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total bounty funding',
        data: bountyTrendChartData?.totalBountyFunding,
        borderColor: '#E6E8EC',
        backgroundColor: '#E6E8EC',
      },
      {
        label: 'Bounty amount paid',
        data: bountyTrendChartData?.bountyAmountPaid,
        borderColor: '#5A6ACF',
        backgroundColor: '#5A6ACF',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          callback: (label: any) =>
            label === 0 ? `0` : label > 999 ? `${label / 1000}K` : label,
        },
        suggestedMin: 0,
        min: 0,
        title: {
          display: true,
          text: 'Matic',
        },
      },
    },
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
    <div className="flex h-full flex-col tablet:w-3/4">
      <div className="h-1/2">
        <span className="flex flex-row">Bounties</span>
        <div className="flex w-full flex-row">
          <div className="w-1/2 pt-0 tablet:w-3/5">
            <PieChart
              style={{ height: '240px' }}
              data={[
                {
                  title: 'Open',
                  value: bountyStatusData?.openBounties ?? 0,
                  color: '#3D4AA1',
                },
                {
                  title: 'Closed',
                  value: bountyStatusData?.closedBounties ?? 0,
                  color: '#8593ED',
                },
                {
                  title: 'Waiting For Funds',
                  value: bountyStatusData?.waitingForFundsBounties ?? 0,
                  color: '#C7CEFF',
                },
              ]}
              lineWidth={20}
              radius={46}
            />
          </div>
          <div className="flex w-1/2 flex-col	justify-center pl-2.5 text-xs tablet:w-2/5   tablet:pl-0">
            <div className="flex w-full flex-row justify-items-center">
              <div className="flex w-4/5 flex-row pl-6">
                <div className="h-4 w-4 rounded-full	bg-open-bounty"></div>
                <span className="pl-2">Open</span>
              </div>
              <div className="flex w-1/5 flex-row">
                <span className="pl-1">
                  {openBountiesPercentage ? openBountiesPercentage : 0}%
                </span>
              </div>
            </div>
            <div className="flex w-full flex-row justify-items-center pt-2.5">
              <div className="flex w-4/5 flex-row pl-6">
                <div className="h-4 w-4 rounded-full	bg-close-bounty"></div>
                <span className="pl-2">Closed</span>
              </div>
              <div className="flex w-1/5 flex-row">
                <span className="pl-1">
                  {closedBountiesPercentage ? closedBountiesPercentage : 0}%
                </span>
              </div>
            </div>
            <div className="flex w-full flex-row justify-items-center pt-2.5">
              <div className="flex w-4/5 flex-row pl-6">
                <div className="h-4 w-4 rounded-full	bg-wait-bounty"></div>
                <span className="pl-2">Waiting For Funds</span>
              </div>
              <div className="flex w-1/5 flex-row">
                <span className="pl-1">
                  {waitingFundsBountiesPercentage
                    ? waitingFundsBountiesPercentage
                    : 0}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-96 pt-10 pb-4">
        <span className="flex flex-row pb-5">Funding</span>
        <div className="h-64 tablet:h-72">
          <Line options={options} data={data} />
        </div>
      </div>
    </div>
  );
}
