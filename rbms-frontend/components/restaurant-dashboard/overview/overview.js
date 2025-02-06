import React, { useEffect, useState } from 'react';

import { useRestaurantContext } from '@/context/restaurant';

//Styles
import { Grid } from '@mui/material';
import { DashboardContainer } from '@/components/UI';

// Services
import { getRestaurantReview } from '@/services/review';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

//Components
import Cards from './card/card';
import CustomerSatisfaction from './customer-satisfaction/customer-satisfaction';
import RecentReviews from './recent-reviews/recent-reviews';
import ReviewSentimentChart from './review-sentiment-chart/review-sentiment-chart';

const Overview = () => {
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

  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12} lg={7}>
        <Cards reviews={reviews} />
      </Grid>
      <Grid item xs={12} lg={5}>
        <CustomerSatisfaction reviews={reviews} />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ReviewSentimentChart mixedReviews={reviews} sentiment="positive" />
      </Grid>
      <Grid item xs={12} lg={6}>
        <ReviewSentimentChart mixedReviews={reviews} sentiment="negative" />
      </Grid>
      <Grid item xs={12}>
        <RecentReviews reviews={reviews} />
      </Grid>
    </DashboardContainer>
  );
};

export default Overview;
