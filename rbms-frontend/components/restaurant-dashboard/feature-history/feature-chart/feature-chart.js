import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useRestaurantContext } from '@/context/restaurant';
import { enqueueSnackbar } from 'notistack';

// Styles
import * as Styles from './feature-chart.styles';
import { DashboardContent, FlexContainer, Text } from '@/components/UI';
import { Box } from '@mui/material';

// Icons
import LocalAtmTwoToneIcon from '@mui/icons-material/LocalAtmTwoTone';

// Chart
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Utils
import { Periods } from '@/utils/constants';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Services
import { getRestaurantReview } from '@/services/review';

const FeatureChart = ({ payments }) => {
  const [selectedPeriod, setSelectedPeriod] = useState(1);
  const [reviews, setReviews] = useState([]);

  const { details } = useRestaurantContext();

  const calculateTotalAmount = (payments) => {
    let sum = 0;
    payments.forEach((plan) => (sum += plan.planId.charges));
    return sum;
  };

  const totalAmountSpent = calculateTotalAmount(payments);

  const fetchReviews = async () => {
    try {
      const response = await getRestaurantReview(details.id);
      setReviews(response.data.reviews);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    if (details.id) fetchReviews();
  }, [details.id]);

  const filterReviewsByDateRange = (reviews) => {
    const currentDate = dayjs();
    const filteredReviews = reviews.filter((review) => {
      const reviewDate = dayjs(review.createdAt);
      return reviewDate.isAfter(currentDate.subtract(selectedPeriod, 'month'));
    });
    return filteredReviews;
  };

  const filteredReviews = filterReviewsByDateRange(reviews);

  const featurePeriods = payments.map((payment) => {
    const start = dayjs(payment.createdAt).format('DD MMMM YYYY');
    const end = dayjs(payment.createdAt)
      .add(payment.planId.durationInMonths, 'month')
      .format('DD MMMM YYYY');
    return { start, end };
  });

  const occurrencesCount = (filteredReviews) => {
    const dayOccurrences = {};

    filteredReviews.forEach((review) => {
      const day = dayjs(review.createdAt).locale('en').format('DD MMMM YYYY');
      const type = 'review';

      if (!dayOccurrences[day]) {
        dayOccurrences[day] = {
          review: 0,
          featured: featurePeriods.some((item) =>
            dayjs(day).isBetween(item.start, item.end, 'day')
          ),
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
    parsing: {
      xAxisKey: 'featured',
      yAxisKey: 'review',
    },
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
        label: 'Review Posted',
        data: Object.values(occurrences).reverse(),
        backgroundColor: (ctx) => {
          if (ctx.raw?.featured) return 'green';
          else return 'orange';
        },
        pointBorderColor: (ctx) => {
          if (ctx.raw?.featured) return 'green';
          else return 'orange';
        },
        segment: {
          borderColor: (ctx) => {
            if (ctx.p0.raw.featured) return 'green';
            else return 'orange';
          },
        },
        cubicInterpolationMode: 'monotone',
      },
    ],
  };

  return (
    <DashboardContent>
      <FlexContainer sx={{ justifyContent: 'space-between', mb: 1 }}>
        <FlexContainer gap={1}>
          <LocalAtmTwoToneIcon color="success" fontSize="large" />
          <Text variant="body" fontWeight={600}>
            Total {totalAmountSpent}US$ spent
          </Text>
        </FlexContainer>
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
        <Line data={data} options={options} />
      </Box>
    </DashboardContent>
  );
};

export default FeatureChart;
