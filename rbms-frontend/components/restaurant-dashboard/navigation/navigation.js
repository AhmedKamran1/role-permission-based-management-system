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

const Navigation = ({ open }) => {
  const router = useRouter();
  const value = router.asPath.split('/');
  const user = useSelector(selectUserState);

  const { details } = useRestaurantContext();

  const [selectedPage, setSelectedPage] = useState(value[value.length - 1]);

  const handleNavigation = (hide, itemId) => {
    if (hide) return;
    setSelectedPage(itemId);
    router.push(`/restaurant/dashboard/${details.slug}/${itemId}`);
  };

  return (
    <React.Fragment>
      <List>
        {dashboardLinks.map((item) => {
          const hide = item.hide && details.status === 'pending';
          return (
            <Tooltip
              key={item.id}
              placement="bottom"
              arrow
              title={hide ? 'Approval Pending' : ''}
            >
              <DrawerListItem onClick={() => handleNavigation(hide, item.id)}>
                <DrawerListButton
                  disabled={hide}
                  selected={selectedPage.includes(item.id)}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <DrawerListText primary={item.text} open={open} />
                </DrawerListButton>
              </DrawerListItem>
            </Tooltip>
          );
        })}
      </List>
      <List sx={{ mt: 'auto', mb: 4 }}>
        <Link href={`/profile/${user.slug}`}>
          <ListItem>
            <DrawerListButton>
              <ListItemIcon>
                <KeyboardArrowLeftIcon />
              </ListItemIcon>
              <DrawerListText primary={'Go Back'} open={open} />
            </DrawerListButton>
          </ListItem>
        </Link>
      </List>
    </React.Fragment>
  );
};

export default Navigation;
