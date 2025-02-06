import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import * as Styles from './details-card.styles';
import { FlexContainer, Text } from '@/components/UI';
import { Box, ImageList, ImageListItem, Rating } from '@mui/material';

// Icons
import ReportGmailerrorredIcon from '@mui/icons-material/ReportGmailerrorred';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Services
import { getRestaurantReview } from '@/services/review';

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

const DetailsCard = ({ restaurant }) => {
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
  const ratings = reviews.map((review) => review.rating);

  const ratingCounts = Array.from(
    { length: 5 },
    (_, index) => ratings.filter((rating) => rating === index + 1).length
  );

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
        data: ratingCounts.reverse(),
        backgroundColor: 'orange',
        barBorderRadius: 30,
      },
    ],
  };

  const renderImages = (images) => {
    const imageCount = Math.min(images.length, 5);
    const layout = [
      { rows: 2, cols: images.length === 1 ? 4 : 2 },
      {
        rows: images.length === 2 ? 2 : 1,
        cols: images.length === 2 || images.length === 3 ? 2 : 1,
      },
      {
        rows: images.length === 2 ? 2 : 1,
        cols: images.length === 2 || images.length === 3 ? 2 : 1,
      },
      {
        rows: 1,
        cols: images.length === 4 ? 2 : 1,
      },
      {
        rows: 1,
        cols: 1,
        overlayText: images.length - 5,
        overlay: images.length === 5 ? false : true,
      },
    ];

    return layout.slice(0, imageCount).map((layout, index) => (
      <ImageListItem key={index} rows={layout.rows} cols={layout.cols}>
        <Image
          src={
            images.length &&
            getFileUrl(
              process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
              `${restaurant.id}/images/${images[index]}`
            )
          }
          alt="review-image"
          fill
          sizes="100%"
          style={{ objectFit: 'cover', borderRadius: '10px' }}
        />
        {layout.overlay && (
          <Styles.ImageCountOverlay>
            <Text variant="main" color="text.primary">
              +{layout.overlayText}
            </Text>
          </Styles.ImageCountOverlay>
        )}
      </ImageListItem>
    ));
  };
  
  return (
    <Styles.Card>
      <FlexContainer sx={{ flexDirection: 'column', gap: 2, alignItems: 'flex-start' }}>
        <Text variant="subHeader" fontWeight={800}>
          {restaurant.name}
        </Text>
        <FlexContainer gap={1}>
          <Rating value={restaurant.rating} precision={0.5} readOnly size="large" />
          <Text variant="body" fontWeight={600}>
            {restaurant.rating} stars
          </Text>
        </FlexContainer>
        <ImageList
          variant="quilted"
          cols={4}
          rowHeight={70}
          gap={5}
          sx={{ width: '100%' }}
        >
          {renderImages(restaurant.images)}
        </ImageList>
        <Box>
          <Text variant="body" fontWeight={800} mr={1}>
            Address:
          </Text>
          <Text variant="body">
            {restaurant.address} , {restaurant.location.country}
          </Text>
        </Box>
        <Box>
          <Text variant="body" fontWeight={800} mr={1}>
            Contact:
          </Text>
          <Text variant="body">
            {restaurant.isVerified ? `+${restaurant.phoneNumber}` : 'No Number'}
          </Text>
        </Box>
        <FlexContainer gap={1}>
          <Text variant="main" fontWeight={500}>
            Review Summary
          </Text>
          <ReportGmailerrorredIcon />
        </FlexContainer>
        <Box sx={{ height: '175px', width: '100%' }}>
          <Bar data={data} options={options} />
        </Box>
      </FlexContainer>
    </Styles.Card>
  );
};

export default DetailsCard;
