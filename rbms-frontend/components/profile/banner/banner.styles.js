import { Box, styled } from '@mui/material';

export const BannerContainer = styled(Box)(({ theme }) => ({
  height: '450px',
  width: '100%',
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
}));

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 15,
  right: 15,

  [theme.breakpoints.down('md')]: {
    top: 100,
  },
}));
