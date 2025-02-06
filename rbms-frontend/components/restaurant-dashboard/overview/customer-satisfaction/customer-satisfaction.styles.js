import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const SatisfactionContainer = styled(FlexContainer)(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));
