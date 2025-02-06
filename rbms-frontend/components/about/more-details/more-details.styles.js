import { styled, Grid } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const BannerContent = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
  },
}));

export const BannerImage = styled(Grid)(({ theme }) => ({
  height: '600px',
  width: '600px',
  position: 'relative',

  [theme.breakpoints.down('md')]: {
    height: '250px',
  },
}));
