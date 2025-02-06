import { styled } from '@mui/material';
import { LocalDining } from '@mui/icons-material';
import { FlexContainer, Text } from '@/components/UI';

export const LogoContainer = styled(FlexContainer)(({ color, theme }) => ({
  gap: theme.spacing(1),
  color: color === 'primary' ? theme.palette.primary.main : theme.palette.text.primary,
  fontWeight: 500,
  cursor: 'pointer',
}));

export const Logo = styled(LocalDining)(({ theme }) => ({
  fontSize: '3.5rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '3rem',
  },
}));

export const LogoText = styled(Text)(({ hide, theme }) => ({
  display: 'block',

  [theme.breakpoints.down('md')]: {
    display: hide && 'none',
  },
}));
