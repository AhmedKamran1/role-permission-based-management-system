import React from 'react';

// Styles
import * as Styles from './services.styles';
import { Grid, useMediaQuery } from '@mui/material';
import { PaddedButton, SectionContainer, Text } from '@/components/UI';

import Card from './card/card';

const Services = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <SectionContainer container columnSpacing={!isMobile ? 10 : 0}>
      <Grid item xs={12} md={6}>
        <Styles.ServiceContent>
          <Text variant="header" color="primary" fontWeight={500}>
            Our Story and Services
          </Text>
          <Text variant="bigHeader" fontWeight={800}>
            Our Culinary Journey And
            <Text variant="bigHeader" color="primary" fontWeight={800} ml={1}>
              Services.
            </Text>
          </Text>
          <Text variant="subHeader">
            Rooted in passion, we curate unforgettable dining experiences and offer
            exceptional services, blending culinary artistry with warm hospitality.
          </Text>
          <PaddedButton>
            <Text variant="main" fontWeight={800}>
              Explore
            </Text>
          </PaddedButton>
        </Styles.ServiceContent>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card />
      </Grid>
    </SectionContainer>
  );
};

export default Services;
