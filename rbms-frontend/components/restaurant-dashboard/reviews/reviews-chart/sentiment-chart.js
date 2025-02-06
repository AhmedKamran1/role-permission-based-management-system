import React from 'react';

// Styles
import { Box } from '@mui/material';
import { DashboardContent } from '@/components/UI';

// Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);
import { Pie } from 'react-chartjs-2';

const ReviewSentimentChart = ({ reviews }) => {
  const countByType = reviews.reduce((acc, review) => {
    acc[review.sentiment] = (acc[review.sentiment] || 0) + 1;
    return acc;
  }, {});

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
        text: 'Listing',
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 10,
        },
        display: false,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        display: false,
      },
    },
  };

  const data = {
    labels: ['Positive Reviews', 'Negative Reviews', 'Neutral Reviews'],
    datasets: [
      {
        label: 'Number of Records',
        data: [countByType['positive'], countByType['negative'], countByType['neutral']],
        backgroundColor: ['orange', 'red', 'yellow'],
      },
    ],
  };
  return (
    <DashboardContent>
      <Box sx={{ height: '290px' }}>
        <Pie data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default ReviewSentimentChart;
