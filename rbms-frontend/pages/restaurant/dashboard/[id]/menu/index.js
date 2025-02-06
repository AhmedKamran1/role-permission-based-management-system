import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Menu from '@/components/restaurant-dashboard/menu/menu';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const MenuPage = () => {
  return <Menu />;
};

MenuPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(MenuPage, { roles: [UserRoles.MANAGER] });
