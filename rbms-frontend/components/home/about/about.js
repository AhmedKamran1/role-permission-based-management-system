import React from 'react';

// Styles
import * as Styles from './about.styles';
import { Grid, useMediaQuery } from '@mui/material';
import { Text } from '@/components/UI';

const About = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <Styles.AboutContainer container columnSpacing={!isMobile ? 10 : 0}>
      <Grid item xs={6} sx={{ display: { xs: 'none', md: 'block' } }}></Grid>
      <Grid item xs={12} md={6} zIndex={2}>
        <Styles.AboutContent>
          <Text variant="header" color="primary" fontWeight={500}>
            Our Story and Services
          </Text>
          <Text variant="bigHeader" fontWeight={800} color="text.primary">
            We Document Every Food Bean Process untile it is saved
          </Text>
          <Text variant="subHeader" color="text.primary">
            Rooted in passion, we curate unforgettable dining experiences and offer
            exceptional services, blending culinary artistry with warm hospitality.
          </Text>
        </Styles.AboutContent>
      </Grid>
    </Styles.AboutContainer>
  );
};

export default About;
