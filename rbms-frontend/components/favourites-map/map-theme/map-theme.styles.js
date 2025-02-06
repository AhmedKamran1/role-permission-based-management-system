import { styled, Box, IconButton, Paper } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const ProfileContainer = styled(FlexContainer)(({ theme }) => ({
  position: 'absolute',
  top: 100,
  left: 30,
  zIndex: 2,
  gap: theme.spacing(1),

  [theme.breakpoints.down('md')]: {
    left: 10,
    gap: theme.spacing(0.5),
  },
}));

export const Themes = styled(Box)(({ theme }) => ({
  height: 30,
  width: 30,
  borderRadius: '50%',
  border: '1px solid lightgrey',

  [theme.breakpoints.down('md')]: {
    height: 22,
    width: 22,
  },
}));

export const ThemeButton = styled(IconButton)(({ theme, selected }) => ({
  backgroundColor: selected && theme.palette.primary.main,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },
}));

export const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(1),
  height: 50,
  backgroundColor: 'rgba(255, 255, 255, 0.75)',

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0.5),
  },
}));
