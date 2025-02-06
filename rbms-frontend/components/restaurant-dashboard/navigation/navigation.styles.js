import { IconButton, styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const RestaurantDetails = styled(FlexContainer)(({ theme, open }) => ({
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  flexDirection: 'column',
  marginTop: `${theme.spacing(3)}`,
  gap: `${theme.spacing(2)}`,
  [theme.breakpoints.down('md')]: {
    marginTop: `${theme.spacing(0)}`,
    display: open ? 'flex' : 'none',
  },
}));

export const AvatarButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  right: 0,
  backgroundColor: theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

export const AvatarConfirmation = styled(FlexContainer)(({ theme }) => ({
  position: 'absolute',
  bottom: -20,
  left: 20,
}));
