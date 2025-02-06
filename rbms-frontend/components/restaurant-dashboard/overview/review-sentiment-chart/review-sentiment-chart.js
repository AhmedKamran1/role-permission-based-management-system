import React, { useState } from 'react';
import dayjs from 'dayjs';

//Styles
import * as Styles from './review-sentiment-chart.styles';
import { Box } from '@mui/material';
import { DashboardContent, FlexContainer, Text } from '@/components/UI';

// Utils
import { Periods } from '@/utils/constants';

// Chart
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ReviewSentimentChart = ({ mixedReviews, sentiment }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);

  const reviews = mixedReviews.filter((review) => review.sentiment === sentiment);

  const filterReviewsByDateRange = (reviews) => {
    const currentDate = dayjs();
    const filteredReviews = reviews.filter((review) => {
      const reviewDate = dayjs(review.createdAt);
      return reviewDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredReviews;
  };

  const filteredReviews = filterReviewsByDateRange(reviews);

  const occurrencesCount = (filteredReviews) => {
    const dayOccurrences = {};

    filteredReviews.forEach((review) => {
      const day = dayjs(review.createdAt).locale('en').format('DD MMMM YYYY');
      const type = review.sentiment;

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          [sentiment]: 0,
        };
      }

      dayOccurrences[day][type]++;
    });

    return dayOccurrences;
  };

  const occurrences = occurrencesCount(filteredReviews);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 5,
        },
        display: true,
      },
      y: {
        ticks: {
          stepSize: 1,
        },
        display: true,
      },
    },
  };

  const data = {
    labels: Object.keys(occurrences).reverse(),
    datasets: [
      {
        label: `${sentiment} Reviews`,
        data: Object.values(occurrences)
          .reverse()
          .map((occurrence) => occurrence[sentiment]),
        backgroundColor: 'orange',
        borderColor: 'orange',
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  return (
    <DashboardContent>
      <FlexContainer sx={{ justifyContent: 'space-between', mb: 1 }}>
        <Styles.StyledAlert severity="warning">
          <Text variant="sub" fontWeight={500}>
            Sarcastic reviews can cause inaccuracy.
          </Text>
        </Styles.StyledAlert>
        <Styles.OptionContainer>
          {Periods.map((period) => (
            <Styles.Option
              key={period.id}
              selected={period.value === selectedPeriod}
              onClick={() => setSelectedPeriod(period.value)}
            >
              <Text variant="sub" fontWeight={600}>
                {period.id}
              </Text>
            </Styles.Option>
          ))}
        </Styles.OptionContainer>
      </FlexContainer>
      <Box sx={{ height: '280px' }}>
        <Bar data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default ReviewSentimentChart;
