import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import RestaurantImages from '@/components/restaurant-dashboard/restaurant-images/restaurant-images';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const RestaurantImagesPage = () => {
  return <RestaurantImages />;
};

RestaurantImagesPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(RestaurantImagesPage, { roles: [UserRoles.MANAGER] });
