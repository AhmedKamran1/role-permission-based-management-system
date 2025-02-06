import { styled } from '@mui/material';
import { PageContent } from '@/components/UI';

export const Card = styled(PageContent)(({ theme }) => ({
  padding: `${theme.spacing(2)} ${theme.spacing(2)}`,
  maxWidth: '420px',
  borderRadius: '30px',
}));
