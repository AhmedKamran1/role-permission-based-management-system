import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Users from '@/components/restaurant-dashboard/users/users';
import React from 'react';

const UsersPage = () => {
  return <Users />;
};

export default UsersPage;

UsersPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};
