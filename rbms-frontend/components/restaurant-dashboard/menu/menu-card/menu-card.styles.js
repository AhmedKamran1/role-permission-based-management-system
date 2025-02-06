import { CardContent, styled } from '@mui/material';

export const CardContentContainer = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  flexDirection: 'column',
  gap: `${theme.spacing(1)}`,
}));
