import { Box, styled } from '@mui/material';

export const ListContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: '55%',
  left: 30,
  overflowY: 'auto',
  backgroundColor: theme.palette.static.primary,
  zIndex: 1,
  width: '300px',
  height: '75%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  borderRadius: '5px',
  padding: `${theme.spacing(0)} ${theme.spacing(2)}`,

  [theme.breakpoints.down('md')]: {
    height: '225px',
    width: '100vw',
    bottom: 0,
    top: 'unset',
    left: 'unset',
    display: 'flex',
    transform: 'translateY(0)',
    gap: theme.spacing(1),
    padding: `${theme.spacing(0)} ${theme.spacing(1)}`,
  },
}));

export const Restaurant = styled(Box)(({ theme }) => ({
  transition: 'all 0.25s',
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const RestaurantImage = styled(Box)(({ theme }) => ({
  height: '190px',
  position: 'relative',
  marginTop: theme.spacing(1.5),

  [theme.breakpoints.down('md')]: {
    height: '150px',
    width: '200px',
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));
