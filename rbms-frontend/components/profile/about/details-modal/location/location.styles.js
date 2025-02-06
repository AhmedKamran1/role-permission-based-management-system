import { FlexContainer } from '@/components/UI';
import { IconButton, styled } from '@mui/material';

export const UserMapContainer = styled(FlexContainer)(({ theme }) => ({
  height: '300px',
  width: '100%',

  '.mapboxgl-compact': {
    display: 'none',
  },

  [theme.breakpoints.down('md')]: {
    height: '200px',
  },
}));

export const UserMarkerFinder = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '80px',
  right: '3px',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.text.primary,

  '&:hover': { backgroundColor: theme.palette.text.primary },
}));
