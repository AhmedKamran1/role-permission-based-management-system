import { FlexContainer } from '@/components/UI';
import { Box, styled } from '@mui/material';

export const ReviewCard = styled(Box)(({ theme }) => ({
  minHeight: '200px',
  width: '100%',
  wordSpacing: 2,
}));

export const Details = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'flex-start',
  gap: theme.spacing(2),
}));

export const ImageCountOverlay = styled(FlexContainer)(({ theme }) => ({
  backgroundColor: 'rgba(0,0,0,0.5)',
  position: 'absolute',
  height: '100%',
  width: '100%',
}));
