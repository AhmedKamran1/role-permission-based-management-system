import { styled, Box } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const PlanDetails = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  gap: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginTop: theme.spacing(4),
  },
}));

export const RestaurantImage = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '175px',
  width: '225px',

  [theme.breakpoints.down('md')]: {
    height: '200px',
    width: '100%',
  },
}));
