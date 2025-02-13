import React, { useEffect, useState } from 'react';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Components
import AdminsTable from './admins-table';

// Services
import { getAllAdmins } from '@/services';

const Admins = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await getAllAdmins();
      setAdmins(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <DashboardContainer container>
      <Grid item xs={12}>
        <AdminsTable admins={admins} />
      </Grid>
    </DashboardContainer>
  );
};

export default Admins;
