import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Overview from '@/components/restaurant-dashboard/overview/overview';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const OverviewPage = () => {
  return <Overview />;
};

OverviewPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(OverviewPage, { roles: [UserRoles.MANAGER] });
