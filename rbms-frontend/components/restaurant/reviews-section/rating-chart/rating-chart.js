import React, { useEffect, useState } from 'react';

import { useRestaurantContext } from '@/context/restaurant';

// Styles
import { Box, Grid, Rating } from '@mui/material';
import { FlexContainer, Text } from '@/components/UI';

//Chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Services
import { getRestaurantReview } from '@/services/review';

const RatingChart = ({ restaurant, postedReview }) => {
  const [reviews, setReviews] = useState([]);

  const { details } = useRestaurantContext();

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

  useEffect(() => {
    if (postedReview) {
      const review = {};
      for (const [key, value] of postedReview.entries()) {
        review[key] = value;
      }
      review.rating = parseInt(review.rating);
      setReviews((prevState) => [...prevState, review]);
    }
  }, [postedReview]);

  const ratings = reviews.map((review) => review.rating);

  const ratingCounts = Array.from(
    { length: 5 },
    (_, index) => ratings.filter((rating) => rating === index + 1).length
  );

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) / reviews.length;

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
        grid: {
          display: false,
        },
      },
    },
  };

  const labels = ['5', '4', '3', '2', '1'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Number Of Ratings',
        data: ratingCounts.reverse(),
        backgroundColor: 'orange',
      },
    ],
  };

  const satisfactionPercentage = (averageRating / 5) * 100;

  return (
    <Grid container justifyContent="center">
      <Grid item xs={12} md={6}>
        <FlexContainer sx={{ flexDirection: 'column', gap: 1, height: '100%' }}>
          <Text variant="body" fontWeight={500} sx={{ letterSpacing: 1.5 }}>
            RATING SUMMARY
          </Text>
          <FlexContainer gap={1}>
            <Text variant="subHeader" fontWeight={800}>
              {averageRating.toFixed(1)}
            </Text>
            <Text variant="sub" fontWeight={500}>
              ({reviews.length} Reviews)
            </Text>
          </FlexContainer>
          <Rating
            name="rating"
            readOnly
            value={restaurant.rating}
            precision={0.5}
            sx={{ fontSize: '2.5rem' }}
          />
          <Text variant="sub" fontWeight={500}>
            {satisfactionPercentage.toFixed(0)}% reviewers recommend this restaurant
          </Text>
        </FlexContainer>
      </Grid>
      <Grid item xs={12} md={6} sx={{ mt: 2 }}>
        <Box sx={{ height: '200px' }}>
          <Bar data={data} options={options} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default RatingChart;
