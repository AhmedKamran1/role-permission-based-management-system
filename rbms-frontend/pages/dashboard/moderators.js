import withAuth from '@/components/auth/with-auth';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Moderators from '@/components/restaurant-dashboard/moderators/moderators';
import { PERMISSIONS } from '@/utils/permissions';
import { ROLES } from '@/utils/roles';
import React from 'react';

const ModeratorsPage = () => {
  return <Moderators />;
};

ModeratorsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(ModeratorsPage, {
  roles: [ROLES.ADMIN, ROLES.MODERATOR, ROLES.USER],
  requiredPermission: PERMISSIONS.VIEW_MODERATORS,
});
