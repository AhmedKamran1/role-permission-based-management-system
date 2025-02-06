import { styled } from '@mui/material';
import { Text } from '@/components/UI';

export const ResetText = styled(Text)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textDecoration: 'underline',
  cursor: 'pointer',
  fontWeight: 500,
}));
