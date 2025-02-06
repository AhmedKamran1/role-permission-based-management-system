import React from 'react';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import { DashboardContent, FlexContainer, Text } from '@/components/UI';
import { Grid, Rating } from '@mui/material';

// Icons
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import ReviewsIcon from '@mui/icons-material/Reviews';

const Cards = ({ reviews }) => {
  const { details } = useRestaurantContext();

  const statistics = [
    {
      icon: <ReviewsIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Reviews',
      content: details.count,
    },
    {
      icon: <ThumbsUpDownIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Rating',
      content: <Rating value={details.rating} readOnly />,
    },
    {
      icon: <ReviewsIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Reviews',
      content: details.count,
    },
    {
      icon: <ThumbsUpDownIcon color="primary" fontSize="large" sx={{ mb: 1 }} />,
      text: 'Rating',
      content: <Rating value={details.rating} readOnly />,
    },
  ];

  return (
    <Grid container columnSpacing={1}>
      {statistics.map((item, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <DashboardContent height="170px">
            <FlexContainer sx={{ flexDirection: 'column', height: '100%' }}>
              {item.icon}
              <Text variant="subHeader">{item.content}</Text>
              <Text variant="sub">{item.text}</Text>
            </FlexContainer>
          </DashboardContent>
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
