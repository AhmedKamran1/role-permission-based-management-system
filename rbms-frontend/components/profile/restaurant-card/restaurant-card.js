import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { enqueueSnackbar } from 'notistack';

// Services
import { getMapBySlug, getUserRestaurants } from '@/services';

// Styles
import * as Styles from './restaurant-card.styles';
import { Card, CardMedia, Chip, Grid, Rating } from '@mui/material';
import { FlexContainer, PrimaryButton, Text } from '@/components/UI';

// Icons
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import LocationIcon from '@mui/icons-material/LocationOn';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Utils
import { Status } from '@/utils/constants';

const RestaurantCard = ({ mapSlug = null, favouriteTab = false }) => {
  const [restaurants, setRestaurants] = useState([]);

  const fetchUserRestaurants = async () => {
    try {
      const response = await getUserRestaurants();
      setRestaurants(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  const fetchFavouriteRestaurants = async () => {
    try {
      const response = await getMapBySlug(mapSlug);
      setRestaurants(response.data.restaurants);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    setRestaurants([]);
    if (mapSlug) {
      fetchFavouriteRestaurants();
    } else if (!favouriteTab) {
      fetchUserRestaurants();
    }
  }, [mapSlug, favouriteTab]);

  const statusColors = {
    [Status.APPROVED]: 'success',
    [Status.PENDING]: 'primary',
    [Status.REJECTED]: 'error',
  };

  if (restaurants.length === 0) {
    return (
      <FlexContainer mt={10} gap={2} textAlign="center">
        <RestaurantMenuIcon fontSize="large" color="primary" />
        <Text variant="subHeader">Currently No Restaurants</Text>
      </FlexContainer>
    );
  }

  return (
    <Grid container justifyContent="center" spacing={2}>
      {restaurants.map((restaurant, index) => (
        <Grid item xs={12} md={12} key={index}>
          <Card
            sx={{
              height: '180px',
              display: 'flex',
            }}
          >
            <CardMedia sx={{ height: '100%', width: '40%', position: 'relative' }}>
              <Image
                src={
                  (restaurant.cover &&
                    getFileUrl(
                      process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                      `${restaurant.id}/cover/${restaurant.cover}`
                    )) ||
                  '/assets/images/bg-placeholder.png'
                }
                alt="menu-item"
                sizes="100vw"
                fill
                style={{ objectFit: 'cover' }}
              />
            </CardMedia>
            <Styles.CardContentContainer>
              {!mapSlug && (
                <Chip
                  label={restaurant.status}
                  color={statusColors[restaurant.status]}
                  variant="outlined"
                  sx={{ position: 'absolute', top: 5, right: 5 }}
                />
              )}
              {restaurant.featuredTill && (
                <Chip
                  label="featured"
                  color="info"
                  variant="outlined"
                  sx={{ position: 'absolute', top: 40, right: 5 }}
                />
              )}
              <Text variant="main" color="text.secondary" fontWeight={800}>
                {restaurant.name}
              </Text>
              <Rating value={restaurant.rating} precision={0.5} readOnly />
              <Styles.IconContainer>
                <RestaurantMenuIcon color="primary" />
                <Text variant="sub" color="text.secondary">
                  {restaurant.categories.join(' / ')}
                </Text>
              </Styles.IconContainer>
              <Styles.IconContainer>
                <LocationIcon color="primary" />
                <Text variant="sub" color="text.secondary">
                  {restaurant.address}
                </Text>
              </Styles.IconContainer>
              <FlexContainer sx={{ position: 'absolute', right: 10, bottom: 10, gap: 1 }}>
                <Link href={`/restaurant/${restaurant.slug}`}>
                  <PrimaryButton>
                    <Text variant="sub" fontWeight={800}>
                      View
                    </Text>
                  </PrimaryButton>
                </Link>
                {!mapSlug && (
                  <Link href={`/restaurant/dashboard/${restaurant.slug}/overview`}>
                    <PrimaryButton>
                      <Text variant="sub" fontWeight={800}>
                        Dashboard
                      </Text>
                    </PrimaryButton>
                  </Link>
                )}
              </FlexContainer>
            </Styles.CardContentContainer>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default RestaurantCard;
