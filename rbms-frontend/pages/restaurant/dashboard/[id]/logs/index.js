import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Logs from '@/components/restaurant-dashboard/logs/logs';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const LogsPage = () => {
  return <Logs />;
};

LogsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(LogsPage, { roles: [UserRoles.MANAGER] });
