import React, { useState } from 'react';
import withAuth from '../auth/with-auth';
import { RestaurantProvider } from '@/context/restaurant';

// Components
import Navigation from '../restaurant-dashboard/navigation/navigation';

// Styles
import { DrawerIcon, CustomDrawer } from '../UI';

// Icons
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import RestaurantLogo from '../restaurant-dashboard/restaurant-logo/restaurant-logo';

// Utils
import { UserRoles } from '@/utils/roles';

const RestaurantDashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  const handleNavDrawer = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <RestaurantProvider>
      <CustomDrawer variant="permanent" open={open} onClose={handleNavDrawer}>
        <DrawerIcon onClick={handleNavDrawer} open={open}>
          {open ? (
            <KeyboardArrowLeftIcon color="primary" fontSize="large" />
          ) : (
            <KeyboardArrowRightIcon color="primary" fontSize="large" />
          )}
        </DrawerIcon>
        <RestaurantLogo open={open} />
        <Navigation />
      </CustomDrawer>
      {children}
    </RestaurantProvider>
  );
};

export default withAuth(RestaurantDashboardLayout, { roles: [UserRoles.MANAGER] });
