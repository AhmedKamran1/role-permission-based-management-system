import { styled } from '@mui/material';
import { PageContent } from '@/components/UI';

export const Card = styled(PageContent)(({ theme }) => ({
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
}));
