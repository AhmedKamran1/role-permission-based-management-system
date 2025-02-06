import { styled } from '@mui/material';
import { FlexContainer, Text } from '@/components/UI';

export const Header = styled(Text)(({ theme }) => ({
  display: 'block',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(1),
  fontWeight: 900,
}));

export const Name = styled(Text)(({ theme }) => ({
  display: 'block',
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

export const Details = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
}));
