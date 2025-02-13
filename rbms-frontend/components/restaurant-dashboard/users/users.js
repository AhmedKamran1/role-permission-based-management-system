import React, { useEffect, useState } from 'react';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Components
import UsersTable from './users-table';

// Services
import { getAllBasicUsers } from '@/services';

const Moderators = () => {
  const [users, setUsers] = useState([]);

  const fetchBasicUsers = async () => {
    try {
      const response = await getAllBasicUsers();
      setUsers(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchBasicUsers();
  }, []);

  return (
    <DashboardContainer container>
      <Grid item xs={12}>
        <UsersTable users={users} />
      </Grid>
    </DashboardContainer>
  );
};

export default Moderators;
