import React, { useEffect, useState } from 'react';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Components
import ModeratorsTable from './moderators-table';

// Services
import { getAllModerators } from '@/services';

const Moderators = () => {
  const [moderators, setModerators] = useState([]);

  const fetchModerators = async () => {
    try {
      const response = await getAllModerators();
      setModerators(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchModerators();
  }, []);

  return (
    <DashboardContainer container>
      <Grid item xs={12}>
        <ModeratorsTable moderators={moderators} />
      </Grid>
    </DashboardContainer>
  );
};

export default Moderators;
