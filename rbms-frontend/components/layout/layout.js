import React from 'react';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';

// Styles
import { useMediaQuery } from '@mui/material';
import { PageContainer } from '../UI';

// Snackbar
import { SnackbarProvider } from 'notistack';
import { StyledMaterialDesignContent } from '../UI';

const Layout = ({ children }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <React.Fragment>
      <SnackbarProvider
        maxSnack={3}
        autoHideDuration={2000}
        Components={{
          success: StyledMaterialDesignContent,
          error: StyledMaterialDesignContent,
        }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: isMobile ? 'center' : 'right',
        }}
      >
        <Navbar />
        <PageContainer>{children}</PageContainer>
        <Footer />
      </SnackbarProvider>
    </React.Fragment>
  );
};

export default Layout;
