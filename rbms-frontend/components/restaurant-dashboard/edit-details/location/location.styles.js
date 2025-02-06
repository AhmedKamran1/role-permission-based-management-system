import { IconButton, styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const MapContainer = styled(FlexContainer)(({ theme }) => ({
  height: '100%',
  width: '100%',
  borderRadius: '5px',
  overflow: 'hidden',

  '.mapboxgl-compact': {
    display: 'none',
  },
}));

export const Marker = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  bottom: '80px',
  right: '3px',
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.text.primary,
}));
