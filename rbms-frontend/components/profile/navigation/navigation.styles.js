import { AppBar, Box, styled } from '@mui/material';
import { NAV_HEIGHT } from '@/utils/constants';

export const TabItemContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  borderRadius: '5px',
  backgroundColor: theme.palette.text.primary,
  position: 'relative',
  top: -75,
  [theme.breakpoints.down('md')]: {
    order: 1,
  },
}));

export const TabsContainer = styled(Box)(({ theme }) => ({
  borderBottom: '1px solid lightgrey',
  [theme.breakpoints.down('lg')]: {
    display: 'none',
  },
}));

export const FixedTabs = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.static.primary,
  marginTop: `${NAV_HEIGHT}px`,
  transition: 'opacity 0.75s',
  animation: 'fadeInDown 0.5s ease-out',

  '@keyframes fadeInDown': {
    '0%': {
      opacity: '0',
      transform: 'translate3d(0, -100%, 0);',
    },
    '100%': {
      opacity: '1',
      transform: 'translate3d(0, 0, 0);',
    },
  },
}));
