import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { enqueueSnackbar } from 'notistack';

// Services
import { listRestaurant } from '@/services';

// Styles
import { Box, Button } from '@mui/material';
import { FlexContainer, PrimaryButton, Text } from '../../UI';

const ListingConfirmation = ({
  activeStep,
  handleBack,
  detailValues,
  locationValues,
  legalValues,
}) => {
  const router = useRouter();

  const submitHandler = async () => {
    try {
      formik.setSubmitting(true);

      const { name, taxId } = legalValues;
      const { categories, phoneNumber } = detailValues;
      const { location, address } = locationValues;
      const payload = { name, taxId, categories, location, address, phoneNumber };

      const { data } = await listRestaurant(payload);

      enqueueSnackbar({
        variant: 'success',
        message: 'Restaurant Listed',
        onExited: () => router.push(`/restaurant/dashboard/${data.slug}/overview`),
      });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: 'error' });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {},
    onSubmit: submitHandler,
  });

  return (
    <React.Fragment>
      {activeStep === 3 && (
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Box sx={{ position: 'relative', height: { xs: '200px', md: '400px' } }}>
            <Image src={'/assets/images/scene10.svg'} alt="login-image" fill sizes="100vw" />
          </Box>
          <Box textAlign="center">
            <Text variant="header" fontWeight={500}>
              Restaurant Listing Almost Completed!
            </Text>
          </Box>
          <Box textAlign="center" mt={2}>
            <Text variant="main">
              Select Finish to successfully register your restaurant.
            </Text>
          </Box>
          <FlexContainer sx={{ justifyContent: 'space-around', mt: 4 }}>
            <Button variant="outlined" onClick={handleBack}>
              <Text variant="body">Back</Text>
            </Button>
            <PrimaryButton type="submit" disabled={formik.isSubmitting}>
              <Text variant="body">Finish</Text>
            </PrimaryButton>
          </FlexContainer>
        </Box>
      )}
    </React.Fragment>
  );
};

export default ListingConfirmation;
