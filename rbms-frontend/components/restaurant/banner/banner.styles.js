import { styled, Box, IconButton } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const BannerContainer = styled(Box)(({ theme }) => ({
  height: '650px',
  position: 'relative',

  '&:after': {
    content: '""',
    position: 'absolute',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    boxShadow: 'inset 0 -175px 100px 0px #000000',
  },

  [theme.breakpoints.down('md')]: {
    height: '350px',
  },
}));

export const CarousalIcon = styled(FlexContainer)(({ theme }) => ({
  height: '100%',
  width: '100%',
  position: 'absolute',
}));

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  zIndex: 2,
  color: theme.palette.primary.main,
  backgroundColor: theme.palette.static.primary,
  '&:hover': {
    color: theme.palette.static.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const RestaurantDetails = styled(Box)(({ theme }) => ({
  zIndex: 2,
  position: 'absolute',
  top: '75%',
  left: '22%',
  color: theme.palette.static.primary,

  [theme.breakpoints.down('md')]: {
    top: '60%',
    left: '15%',
  },
}));

export const FavoriteIcon = styled(IconButton)(({ theme, selected }) => ({
  position: 'absolute',
  top: '78%',
  right: '22%',
  color: selected ? theme.palette.primary.main : theme.palette.static.primary,

  [theme.breakpoints.down('md')]: {
    top: '5%',
    right: '5%',
  },
}));
