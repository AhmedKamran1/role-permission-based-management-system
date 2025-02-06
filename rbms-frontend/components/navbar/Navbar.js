import React, { useState } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';
import { NotificationContextProvider } from '@/context/notifications';

// Components
import Logo from '../logo/logo';
import NavbarDrawer from './drawer/drawer';
import ProfileMenu from './profile-menu/menu';
import NotificationMenu from './notification-menu/menu';

// Icons
import HomeIcon from '@mui/icons-material/Home';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import InfoIcon from '@mui/icons-material/Info';
import MenuIcon from '@mui/icons-material/Menu';

// Styles
import * as Styles from './navbar.styles';
import { IconButton } from '@mui/material';
import { FlexContainer, Text } from '../UI';

const Navbar = () => {
  const user = useSelector(selectUserState);
  const [showDrawer, setShowDrawer] = useState(false);

  const handleNavDrawer = () => {
    setShowDrawer((prevState) => !prevState);
  };

  const navLinks = [
    { id: 'Home', link: '/', icon: <HomeIcon /> },
    { id: 'Discover', link: '/search', icon: <TravelExploreIcon /> },
    { id: 'About Us', link: '/about', icon: <InfoIcon /> },
    { id: 'Log In', link: '/login', authItem: true },
    {
      id: 'Sign Up',
      link: '/signup',
      authItem: true,
      fill: true,
    },
  ];

  return (
    <Styles.AppBarContainer>
      <Logo isHide={true} />
      <FlexContainer>
        <Styles.NavContainer>
          {navLinks.map((item) => (
            <Link key={item.id} href={item.link}>
              {item.authItem ? (
                !user.id && (
                  <Styles.AuthLink fill={item.fill ? 1 : 0}>
                    <Text variant="body">{item.id}</Text>
                  </Styles.AuthLink>
                )
              ) : (
                <Styles.LinkContainer>
                  <Text variant="body">{item.id}</Text>
                </Styles.LinkContainer>
              )}
            </Link>
          ))}
        </Styles.NavContainer>
        <FlexContainer gap={1}>
          {user.id && (
            <NotificationContextProvider>
              <NotificationMenu />
              <ProfileMenu />
            </NotificationContextProvider>
          )}
          <IconButton
            onClick={handleNavDrawer}
            sx={{ display: { xs: 'block', md: 'none' } }}
          >
            <MenuIcon color="primary" sx={{ fontSize: 25 }} />
          </IconButton>
        </FlexContainer>
      </FlexContainer>
      <NavbarDrawer
        navLinks={navLinks}
        handleNavDrawer={handleNavDrawer}
        showDrawer={showDrawer}
      />
    </Styles.AppBarContainer>
  );
};

export default Navbar;
