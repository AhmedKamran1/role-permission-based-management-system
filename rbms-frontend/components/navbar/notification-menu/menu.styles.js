import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const NotificationContainer = styled(FlexContainer)(({ isunread, theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 0.5,
  fontWeight: isunread && 700,
}));

export const Badge = styled(FlexContainer)(({ theme }) => ({
  height: '20px',
  width: '20px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
  marginTop: theme.spacing(0.75),
  marginLeft: theme.spacing(0.75),
}));
