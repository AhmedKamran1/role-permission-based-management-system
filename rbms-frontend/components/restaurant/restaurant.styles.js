import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const ServiceContent = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'flex-start',

  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
}));
