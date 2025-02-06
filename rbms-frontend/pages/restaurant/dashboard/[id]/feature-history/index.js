import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import FeatureHistory from '@/components/restaurant-dashboard/feature-history/feature-history';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const FeatureHistoryPage = () => {
  return <FeatureHistory />;
};

FeatureHistoryPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(FeatureHistoryPage, { roles: [UserRoles.MANAGER] });
