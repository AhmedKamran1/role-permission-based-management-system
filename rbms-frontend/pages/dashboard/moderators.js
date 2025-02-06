import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Moderators from '@/components/restaurant-dashboard/moderators/moderators';
import React from 'react';

const ModeratorsPage = () => {
  return <Moderators />;
};

export default ModeratorsPage;

ModeratorsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};
