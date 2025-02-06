import withAuth from '@/components/auth/with-auth';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Admins from '@/components/restaurant-dashboard/admins/admins';
import { PERMISSIONS } from '@/utils/permissions';
import { ROLES } from '@/utils/roles';
import React from 'react';

const AdminsPage = () => {
  return <Admins />;
};

AdminsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(AdminsPage, {
  roles: [ROLES.ADMIN, ROLES.MODERATOR],
  requiredPermission: PERMISSIONS.VIEW_ADMINS,
});
