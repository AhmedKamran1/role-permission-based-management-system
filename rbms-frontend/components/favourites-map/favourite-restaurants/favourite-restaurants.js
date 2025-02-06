import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './favourite-restaurants.styles';
import { FlexContainer, Text } from '@/components/UI';
import { Box, Chip, Divider, Rating, useMediaQuery } from '@mui/material';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';

const FavouriteRestaurants = ({
  restaurants,
  flyToLocation,
  hoverIdHandler,
  resetHoverIdHandler,
}) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const locationUpdateHandler = (coordinates) => {
    flyToLocation(coordinates[0], coordinates[1]);
  };

  return (
    <Styles.ListContainer>
      {restaurants.map((restaurant, index) => (
        <Styles.Restaurant
          onMouseEnter={() => hoverIdHandler(restaurant.id)}
          onMouseLeave={resetHoverIdHandler}
          onClick={() => locationUpdateHandler(restaurant.location.coordinates)}
          key={index}
        >
          <Styles.RestaurantImage>
            <Image
              src={
                (restaurant.cover &&
                  getFileUrl(
                    process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                    `${restaurant.id}/cover/${restaurant.cover}`
                  )) ||
                '/assets/images/bg-placeholder.png'
              }
              alt="restaurant"
              fill
              sizes="100vw"
              style={{ objectFit: 'cover', borderRadius: '5px' }}
            />
            {restaurant.featuredTill && (
              <Chip
                label="Featured"
                color="info"
                variant="filled"
                sx={{ position: 'absolute', top: 10, left: 5 }}
              />
            )}
          </Styles.RestaurantImage>
          <FlexContainer sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Text variant="main" fontWeight={500}>
              {restaurant.name}
            </Text>
            <Box>
              <Rating
                value={restaurant.rating}
                readOnly
                precision={0.5}
                size={isMobile ? 'small' : 'medium'}
              />
              <Text variant="sub" sx={{ display: 'block', textAlign: 'center' }}>
                {restaurant.rating} ({restaurant.count} reviews)
              </Text>
            </Box>
          </FlexContainer>
          {!isMobile && <Divider flexItem sx={{ mt: 2, mb: 2 }} />}
        </Styles.Restaurant>
      ))}
    </Styles.ListContainer>
  );
};

export default FavouriteRestaurants;
