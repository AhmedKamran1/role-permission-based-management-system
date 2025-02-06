import { Box, styled } from '@mui/material';
import { FlexContainer } from '../UI';

export const ReviewCard = styled(Box)(({ theme }) => ({
  minHeight: '200px',
  width: '100%',
  backgroundColor: 'rgba(180, 180, 180, 0.1)',
  border: '1px solid rgba(180, 180, 180, 0.2)',
  padding: theme.spacing(2),
  borderRadius: '15px',
  wordSpacing: 2,
  marginBottom: theme.spacing(3),
}));

export const UserDetails = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
  position: 'relative',
}));

export const ReviewOptions = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  right: -5,
}));

export const ImageCountOverlay = styled(FlexContainer)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  height: '100%',
  width: '100%',
}));
