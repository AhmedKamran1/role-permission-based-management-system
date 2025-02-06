import { styled, Box } from '@mui/material';

export const BannerContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '50vh',
  position: 'relative',
  background: `linear-gradient(30deg, ${theme.palette.secondary.main} 10%, ${theme.palette.static.primary} 99%)`,
  textAlign: 'center',
}));

export const WavesContainer = styled(Box)(({ theme }) => ({
  height: '250px',
  width: '100vw',
  position: 'relative',
  bottom: 250,

  [theme.breakpoints.down('md')]: {
    height: '100px',
    bottom: 100,
  },
}));
