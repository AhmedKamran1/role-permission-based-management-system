import React from 'react';
import RestaurantDashboardLayout from '@/components/layout/restaurant-dashboard-layout';
import Reviews from '@/components/restaurant-dashboard/reviews/reviews';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const ReviewsPage = () => {
  return <Reviews />;
};

ReviewsPage.getLayout = (page) => {
  return <RestaurantDashboardLayout>{page}</RestaurantDashboardLayout>;
};

export default withAuth(ReviewsPage, { roles: [UserRoles.MANAGER] });
