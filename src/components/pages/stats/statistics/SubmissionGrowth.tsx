import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

import { SubmissionsGrowthData } from '@/server/routes/statistics/getSubmissionGrowth';

Chart.register(...registerables);

export default function SubmissionsGrowth({
  submissionsGrowth,
}: {
  submissionsGrowth: SubmissionsGrowthData | undefined;
}) {
  const labels = submissionsGrowth?.labels;
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Total Submissions',
        data: submissionsGrowth?.totalSubmissions,
        borderColor: '#E6E8EC',
        backgroundColor: '#E6E8EC',
      },
      {
        label: 'Accepted Submissions',
        data: submissionsGrowth?.acceptedSubmissions,
        borderColor: '#00B894',
        backgroundColor: '#00B894',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        suggestedMin: 0,
        min: 0,
        title: {
          display: true,
          text: 'No.of Submissions',
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

  return (
    <div className="h-64 tablet:h-72">
      <Line options={options} data={data} />
    </div>
  );
}
