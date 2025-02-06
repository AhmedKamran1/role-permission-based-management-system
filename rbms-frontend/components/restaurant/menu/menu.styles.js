import { styled } from '@mui/material';
import { FlexContainer, PageContent } from '@/components/UI';

export const Card = styled(PageContent)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: '20px',
  backgroundColor: theme.palette.static.primary,
}));

export const Header = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(5),
  gap: theme.spacing(2),
}));
