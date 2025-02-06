import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

// Components
import Logo from '@/components/logo/logo';

// Styles
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FlexContainer, Text } from '@/components/UI';
import { AuthLink } from '../navbar.styles';

const NavbarDrawer = ({ showDrawer, handleNavDrawer, navLinks }) => {
  const user = useSelector(selectUserState);

  return (
    <Drawer
      sx={{ '& .MuiDrawer-paper': { width: '250px' } }}
      anchor="right"
      open={showDrawer}
      onClose={handleNavDrawer}
      keepMounted
    >
      <Box sx={{ mt: 7 }}>
        <Logo />
      </Box>
      <List sx={{ mt: 3 }}>
        {navLinks.map(
          (item) =>
            !item.authItem && (
              <Link key={item.id} href={item.link}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ pl: 5 }}>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText sx={{ color: 'text.secondary' }} primary={item.id} />
                  </ListItemButton>
                </ListItem>
              </Link>
            )
        )}
      </List>
      {!user.id && (
        <React.Fragment>
          <Divider orientation="horizontal" variant="middle" />
          <FlexContainer gap={1} mt={2}>
            {navLinks.map(
              (item) =>
                item.authItem && (
                  <Link key={item.id} href={item.link}>
                    <AuthLink fill={item.fill ? 1 : 0}>
                      <Text variant="body">{item.id}</Text>
                    </AuthLink>
                  </Link>
                )
            )}
          </FlexContainer>
        </React.Fragment>
      )}
    </Drawer>
  );
};

export default NavbarDrawer;
