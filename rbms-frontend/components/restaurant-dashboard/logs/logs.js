import React from 'react';

//Styles
import { DashboardContainer } from '@/components/UI';
import { Grid } from '@mui/material';

import LogsTable from './logs-table/logs-table';

const Logs = () => {
  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12}>
        <LogsTable />
      </Grid>
    </DashboardContainer>
  );
};

export default Logs;
