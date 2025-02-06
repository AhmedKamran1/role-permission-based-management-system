import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// Icons
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

// Styles
import * as Styles from './footer.styles';
import { Divider, Grid } from '@mui/material';
import { FlexContainer, Text } from '../UI';

import Logo from '../logo/logo';

const Footer = () => {
  const router = useRouter();

  const hide = router.pathname.includes('dashboard') || router.pathname.includes('map');
  if (hide) return;
  
  return (
    <Grid container justifyContent="center" rowGap={5} paddingBottom={5}>
      <Grid item xs={12}>
        <Divider variant="middle" />
      </Grid>
      <Grid item lg={3} xs={10} textAlign="center">
        <Logo />
        <Text variant="body">
          A small river named Duden flows by their place and supplies it with the
          necessary regelialia.
        </Text>
      </Grid>
      <Grid item xs={12} lg={4} sx={{ order: { xs: '1', lg: '0' } }}>
        <Styles.RightContainer>
          <Text variant="body">
            Copyright ©2023 All rights reserved by &nbsp;
            <Text variant="body">DineEase</Text>
          </Text>
        </Styles.RightContainer>
      </Grid>
      <Grid item xs={12} lg={3}>
        <Styles.SocialContainer>
          <Text variant="body" color="primary" sx={{ fontWeight: 800 }}>
            Connect With Us
          </Text>
          <FlexContainer gap={1}>
            <Link href="/">
              <FacebookIcon sx={{ fontSize: 30 }} />
            </Link>
            <Link href="/">
              <TwitterIcon sx={{ fontSize: 30 }} />
            </Link>
            <Link href="/">
              <InstagramIcon sx={{ fontSize: 30 }} />
            </Link>
          </FlexContainer>
        </Styles.SocialContainer>
      </Grid>
    </Grid>
  );
};

export default Footer;
