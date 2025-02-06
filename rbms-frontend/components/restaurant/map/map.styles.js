import { Box, IconButton, styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const MapContainer = styled(Box)(({ theme }) => ({
  height: '700px',
  width: '100%',
  margin: 'auto',
  borderRadius: '10px',
  overflow: 'hidden',

  '.mapboxgl-compact': {
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    height: '500px',
  },
}));

export const MarkerFinder = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '80px',
  left: '5px',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.text.primary,

  '&:hover': { backgroundColor: theme.palette.text.primary },
}));

export const Header = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(5),
  gap: theme.spacing(2),
}));