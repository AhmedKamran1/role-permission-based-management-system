import React, { useState } from 'react';
import Image from 'next/image';

// Styles
import { FormDivider, SecondaryContainer, Text } from '../UI';
import { Grid, Step, StepLabel, Stepper, useMediaQuery } from '@mui/material';

// Stepper
import CustomLabels from './stepper/stepper';
import { CustomStepConnector } from './stepper/stepper.styles';

// Components
import LegalitiesForm from './legalities-form/form';
import Location from '@/components/restaurant-dashboard/edit-details/location/location';

// Helpers
import { fetchCountry } from '@/helpers/mapHelpers';
import { listingSteps } from '@/utils/constants';

const RestaurantListing = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [location, setLocation] = useState({ country: '', coordinates: [null, null] });

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up('md'));

  const updateLocation = async (data) => {
    const loc = await fetchCountry(data[0], data[1]);
    setLocation(loc);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  return (
    <SecondaryContainer container>
      <Grid item xs={12} md={5}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          connector={<CustomStepConnector />}
          sx={{ mb: activeStep !== 3 && 5, mt: 2 }}
        >
          {listingSteps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomLabels}>
                <Text variant="body" color="text.ternary">
                  {label}
                </Text>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <LegalitiesForm
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          location={location}
        />
      </Grid>
      {![1, 3].includes(activeStep) && (
        <React.Fragment>
          <FormDivider />
          <Grid item xs={0} md={6} sx={{ position: 'relative', height: '100%' }}>
            <Image
              src={'/assets/images/scene10.svg'}
              fill={true}
              sizes="100vw"
              alt="listing-image"
            />
          </Grid>
        </React.Fragment>
      )}

      {activeStep === 1 && isDesktop && (
        <React.Fragment>
          <FormDivider />
          <Grid item xs={0} md={6} sx={{ height: '75%' }}>
            <Location location={location} updateLocation={updateLocation} />
          </Grid>
        </React.Fragment>
      )}
    </SecondaryContainer>
  );
};

export default RestaurantListing;
