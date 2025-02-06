import { Box, IconButton } from '@mui/material';
import { styled, keyframes } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-7px);
  }
`;

export const Pin = styled(LocationIcon)(({ animating, theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '3rem',
  zIndex: 4,
  animation: animating ? `${bounceAnimation} 1s ease-in-out 1s infinite` : 'none',
}));

export const OptionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  position: 'absolute',
  bottom: '0%',
  left: '50%',
  transform: 'translate(-50%, 65%)',
}));

export const ResetMarker = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '100px',
  right: '5px',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.text.primary,

  '&:hover': { backgroundColor: theme.palette.text.primary },
}));
