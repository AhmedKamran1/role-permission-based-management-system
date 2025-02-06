import React from 'react';
import EditDetailsForm from './form/form';

// Styles
import { Grid } from '@mui/material';
import { DashboardContainer } from '@/components/UI';

const EditDetails = () => {
  return (
    <DashboardContainer container columnSpacing={1} rowGap={1}>
      <Grid item xs={12}>
        <EditDetailsForm />
      </Grid>
    </DashboardContainer>
  );
};

export default EditDetails;
