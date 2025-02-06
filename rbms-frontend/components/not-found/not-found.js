import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Styles
import { PrimaryButton, SecondaryContainer, Text } from '../UI';
import { Box, Grid } from '@mui/material';

// Icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NotFound = () => {
  const router = useRouter();

  return (
    <SecondaryContainer container sx={{ height: 'auto' }}>
      <Grid item xs={12} sx={{ position: 'relative', height: '350px' }}>
        <Image
          src={'/assets/images/food.svg'}
          fill={true}
          sizes="100vw"
          alt="login-image"
        />
      </Grid>
      <Grid item xs={12} textAlign="center">
        <Box mb={2}>
          <Text variant="header" fontWeight={800}>
            404
          </Text>
        </Box>
        <Box mb={4}>
          <Text variant="main">
            Sorry, the page you are looking for could not be found
          </Text>
        </Box>
        <PrimaryButton onClick={() => router.back()} startIcon={<ArrowBackIcon />}>
          Go Back
        </PrimaryButton>
      </Grid>
    </SecondaryContainer>
  );
};

export default NotFound;
