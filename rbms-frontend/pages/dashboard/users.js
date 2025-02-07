import withAuth from '@/components/auth/with-auth';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Users from '@/components/restaurant-dashboard/users/users';
import { PERMISSIONS } from '@/utils/permissions';
import { ROLES } from '@/utils/roles';
import React from 'react';

const UsersPage = () => {
  return <Users />;
};

UsersPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(UsersPage, {
  roles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER],
  requiredPermission: PERMISSIONS.VIEW_USERS,
});
