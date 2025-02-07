import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useRestaurantContext } from '@/context/restaurant';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

// Styles
import { List, ListItem, ListItemIcon, Tooltip } from '@mui/material';
import { DrawerListText, DrawerListButton, DrawerListItem } from '@/components/UI';

// Icons
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

// Utils
import { dashboardLinks } from '@/utils/constants';
import { hasPermission } from '@/helpers/permissionHelper';

const Navigation = ({ open }) => {
  const router = useRouter();
  const value = router.asPath.split('/');
  const user = useSelector(selectUserState);

  const { details } = useRestaurantContext();

  const [selectedPage, setSelectedPage] = useState(value[value.length - 1]);

  const handleNavigation = (itemId) => {
    setSelectedPage(itemId);
    router.push(`/dashboard/${itemId}`);
  };

  return (
    <React.Fragment>
      <List>
        {dashboardLinks.map(
          (item) =>
            hasPermission(user.role, item.requiredPermission) && (
              <DrawerListItem onClick={() => handleNavigation(item.id)}>
                <DrawerListButton selected={selectedPage.includes(item.id)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <DrawerListText primary={item.text} open={open} />
                </DrawerListButton>
              </DrawerListItem>
            )
        )}
      </List>
    </React.Fragment>
  );
};

export default Navigation;
