import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './more-details.styles';
import { SectionContainer, Text } from '@/components/UI';
import { Grid, useMediaQuery } from '@mui/material';

const MoreDetails = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <SectionContainer container columnSpacing={!isMobile ? 10 : 0}>
      <Styles.BannerImage item xs={12} md={6}>
        <Image
          src={'/assets/images/scene2.svg'}
          fill={true}
          sizes="100vw"
          alt="login-image"
        />
      </Styles.BannerImage>
      <Grid item xs={12} md={6} sx={{ order: { xs: 1, md: 0 } }}>
        <Styles.BannerContent>
          <Text variant="bigHeader" fontWeight={800}>
            Discover Uncountable types of categories available to satisfy your taste buds!
            with
            <Text variant="bigHeader" color="primary" fontWeight={800} ml={1}>
              DineEase.
            </Text>
          </Text>
          <Text variant="subHeader">
            Where Each Plate Weaves a Story of Culinary Mastery and Passionate
            Craftsmanship Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
            diam pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit
            augue urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed
            vitae mus risus. Lacus nisi, et ac dapibus sit eu velit in consequat.
          </Text>
        </Styles.BannerContent>
      </Grid>
    </SectionContainer>
  );
};

export default MoreDetails;
