import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserState, userActions } from '@/store/user/userSlice';

// Styles
import * as Styles from './banner.styles';
import { FlexContainer, SectionContainer, Text } from '@/components/UI';
import { Chip, Grid, Rating, Tooltip } from '@mui/material';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Services
import { addMapRestaurant, deleteMapRestaurant, getMapBySlug } from '@/services';

const Banner = ({ restaurant }) => {
  const user = useSelector(selectUserState);
  const dispatch = useDispatch();

  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { images } = restaurant;

  const getFavoriteDetails = async () => {
    try {
      setIsSubmitting(true);
      const response = await getMapBySlug(user.mapSlug);
      const { restaurants } = response.data;

      restaurants.map((v) => {
        if (v.id === restaurant.id) {
          setIsFavorite(true);
        }
      });
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (user?.mapSlug) getFavoriteDetails();
  }, []);

  const forwardImageHandler = () => {
    if (currentImage === images.length - 1) {
      setCurrentImage(0);
    } else {
      setCurrentImage((prevState) => prevState + 1);
    }
  };

  const backwardImageHandler = () => {
    if (currentImage === 0) {
      setCurrentImage(images.length - 1);
    } else {
      setCurrentImage((prevState) => prevState - 1);
    }
  };

  const favoriteHandler = async () => {
    try {
      setIsSubmitting(true);
      if (isFavorite) {
        const response = await deleteMapRestaurant(restaurant.id);
        setIsFavorite(false);
        enqueueSnackbar({
          variant: 'success',
          message: response.data,
        });
      } else {
        const response = await addMapRestaurant({
          restaurantId: restaurant.id,
        });
        setIsFavorite(true);
        enqueueSnackbar({
          variant: 'success',
          message: 'Restaurant Added Successfully',
        });
        dispatch(userActions.updateDetails({ mapSlug: response.data }));
      }
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionContainer container sx={{ mt: 0, mb: 0, width: '100%' }}>
      <Grid item xs={12}>
        <Styles.BannerContainer>
          <Image
            src={
              (images.length &&
                getFileUrl(
                  process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                  `${restaurant.id}/images/${images[currentImage]}`
                )) ||
              '/assets/images/bg-placeholder.png'
            }
            alt="restaurant-image"
            fill
            sizes="100%"
            style={{ objectFit: 'cover' }}
          />

          <Styles.CarousalIcon sx={{ justifyContent: 'left' }}>
            <Styles.StyledIconButton onClick={backwardImageHandler} sx={{ ml: 2 }}>
              <KeyboardArrowLeftIcon />
            </Styles.StyledIconButton>
          </Styles.CarousalIcon>
          <Styles.CarousalIcon sx={{ justifyContent: 'right' }}>
            <Styles.StyledIconButton onClick={forwardImageHandler} sx={{ mr: 2 }}>
              <KeyboardArrowRightIcon />
            </Styles.StyledIconButton>
          </Styles.CarousalIcon>
          <Styles.RestaurantDetails>
            <FlexContainer sx={{ justifyContent: 'flex-start', mb: 1, gap: 2 }}>
              <Text variant="header" fontWeight={900}>
                {restaurant.name}
              </Text>
              {restaurant.featuredTill && (
                <Chip label="Featured" color="info" variant="filled" />
              )}
            </FlexContainer>
            <FlexContainer sx={{ justifyContent: 'left' }}>
              <Rating
                value={restaurant.rating}
                readOnly
                precision={0.5}
                sx={{ fontSize: '2rem' }}
                emptyIcon={
                  <StarIcon sx={{ color: 'static.primary', fontSize: '2rem' }} />
                }
              />
              <Text variant="sub">({restaurant.count} Reviews)</Text>
            </FlexContainer>
          </Styles.RestaurantDetails>
          <Tooltip
            title={isFavorite ? 'Remove from favorite' : 'Add to favorite'}
            placement="bottom"
            arrow
            sx={{ zIndex: 1 }}
          >
            <Styles.FavoriteIcon
              onClick={favoriteHandler}
              selected={+isFavorite}
              disabled={isSubmitting}
            >
              <FavoriteIcon fontSize="large" />
            </Styles.FavoriteIcon>
          </Tooltip>
        </Styles.BannerContainer>
      </Grid>
    </SectionContainer>
  );
};

export default Banner;
