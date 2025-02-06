import { styled } from '@mui/material';
import { Text } from '@/components/UI';

export const SentimentText = styled(Text)(({ theme }) => ({
  display: 'block',
  textAlign: 'center',
  fontWeight: 500,
  marginTop: theme.spacing(1),
}));
