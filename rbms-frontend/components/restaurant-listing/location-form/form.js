import React, { useState, useMemo, useEffect } from 'react';
import { useFormik } from 'formik';

// Components
import DetailsForm from '../details-form/form';
import Location from '@/components/restaurant-dashboard/edit-details/location/location';

// Styles
import {
  FlexContainer,
  FormContainer,
  InputField,
  PrimaryButton,
  Text,
} from '@/components/UI';
import { Box, Button, useMediaQuery } from '@mui/material';

// Utils
import { restaurantLocationSchema } from '@/utils/validation-schema/restaurant';
import { fetchCountry } from '@/helpers/mapHelpers';

const LocationForm = ({ activeStep, handleNext, handleBack, location, legalValues }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const [localLocation, setLocalLocation] = useState(location);

  const updateLocation = async (data) => {
    const loc = await fetchCountry(data[0], data[1]);
    setLocalLocation(loc);
  };

  useEffect(() => {
    setLocalLocation(location);
  }, [location]);

  const initialValues = useMemo(() => {
    return {
      address: '',
      place: localLocation.country,
      latitude: localLocation.coordinates[0] || undefined,
      longitude: localLocation.coordinates[1] || undefined,
    };
  }, [localLocation]);

  const formik = useFormik({
    validateOnMount: true,
    initialValues,
    enableReinitialize: true,
    validationSchema: restaurantLocationSchema,
  });

  return (
    <React.Fragment>
      {activeStep === 1 && (
        <FormContainer>
          <Text variant="header" textAlign={'center'} fontWeight={800}>
            Where is your business located?
          </Text>
          <Text variant="sub" textAlign={'center'} mb={3}>
            Customers will use this information to find your restaurant.
          </Text>
          <InputField
            name="address"
            label="Restaurant Address"
            variant="outlined"
            placeholder="Enter Restaurant Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.address && Boolean(formik.touched.address)}
            helperText={formik.touched.address && formik.errors.address}
          />
          <InputField
            name="place"
            label="Location"
            variant="outlined"
            placeholder="Location"
            value={formik.values.place}
            disabled
          />

          <FlexContainer gap={2}>
            <InputField
              name="longitude"
              label="Longitude"
              variant="outlined"
              placeholder="Longitude"
              value={parseFloat(formik.values.longitude).toFixed(2)}
              disabled
            />

            <InputField
              name="latitude"
              label="Latitude"
              variant="outlined"
              placeholder="Latitude"
              value={parseFloat(formik.values.latitude).toFixed(2)}
              disabled
            />
          </FlexContainer>

          {isMobile && (
            <Box sx={{ width: '100%', height: '250px' }}>
              <Location location={localLocation} updateLocation={updateLocation} />
            </Box>
          )}

          <FlexContainer sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              <Text variant="body">Back</Text>
            </Button>
            <PrimaryButton onClick={handleNext} disabled={!formik.isValid}>
              <Text variant="body">Next</Text>
            </PrimaryButton>
          </FlexContainer>
        </FormContainer>
      )}

      <DetailsForm
        activeStep={activeStep}
        handleNext={handleNext}
        handleBack={handleBack}
        legalValues={legalValues}
        locationValues={{ address: formik.values.address.trim(), location: localLocation }}
      />
    </React.Fragment>
  );
};

export default LocationForm;
