import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const Badge = styled(FlexContainer)(({ theme }) => ({
  height: '20px',
  width: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));
