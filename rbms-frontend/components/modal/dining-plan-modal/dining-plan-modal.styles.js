import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const Fields = styled(FlexContainer)(({ theme }) => ({
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));
