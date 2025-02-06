import React from 'react';
import RestaurantListing from '@/components/restaurant-listing/restaurant-listing';
import withAuth from '@/components/auth/with-auth';
import { UserRoles } from '@/utils/roles';

const ListingPage = () => {
  return <RestaurantListing />;
};

export default withAuth(ListingPage, { roles: [UserRoles.MANAGER] });
