import { AppBar, Button, styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';
import { NAV_HEIGHT } from '@/utils/constants';

export const AppBarContainer = styled(AppBar)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: `${NAV_HEIGHT}px`,
  background: theme.palette.static.primary,
  zIndex: '999',
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.static.ternary}`,

  [theme.breakpoints.down('md')]: {
    justifyContent: 'space-between',
    padding: `0 ${theme.spacing(4)}`,
  },
}));

export const LinkContainer = styled(Button)(({ theme }) => ({
  backgroundColor: 'none',
  color: theme.palette.static.secondary,
  borderRadius: '5px',

  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  fontWeight: 500,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.static.primary,
  },
}));

export const AuthLink = styled(Button)(({ fill, theme }) => ({
  color: fill ? theme.palette.static.primary : theme.palette.primary.main,
  backgroundColor: fill ? theme.palette.primary.main : theme.palette.static.primary,
  boxShadow: !fill && `inset 0px 0px 0px 2px ${theme.palette.primary.main}`,
  padding: `${theme.spacing(1)} ${theme.spacing(2)}`,
  transition: 'background-color 0.3s',

  '&:hover': {
    backgroundColor: fill ? theme.palette.secondary.main : theme.palette.static.primary,
  },
}));

export const NavContainer = styled(FlexContainer)(({ theme }) => ({
  gap: theme.spacing(1),
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));
