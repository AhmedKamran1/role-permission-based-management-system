import { styled } from '@mui/material';
import { FlexContainer } from '../UI';

export const SocialContainer = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(1),
  height: '100%',
}));

export const RightContainer = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  height: '100%',
  textAlign: 'center',
}));
