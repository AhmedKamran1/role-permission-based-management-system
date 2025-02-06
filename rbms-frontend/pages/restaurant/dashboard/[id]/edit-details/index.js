import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import EditDetails from '@/components/restaurant-dashboard/edit-details/edit-details';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const EditDetailsPage = () => {
  return <EditDetails />;
};

EditDetailsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(EditDetailsPage, { roles: [UserRoles.MANAGER] });
