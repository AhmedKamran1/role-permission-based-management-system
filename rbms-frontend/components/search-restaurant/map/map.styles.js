import { Box, styled } from '@mui/material';
import LocationIcon from '@mui/icons-material/LocationOn';
import AssistantTwoToneIcon from '@mui/icons-material/AssistantTwoTone';

export const MapContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  width: '100%',

  '.mapboxgl-compact': {
    display: 'none',
  },
}));

export const Pin = styled(LocationIcon)(({ hovering, theme }) => ({
  color: hovering ? 'rgba(255, 187, 0, 0.5)' : theme.palette.primary.main,
  fontSize: '3rem',
  zIndex: 4,
  transition: 'all 0.5s',
  transform: hovering && 'scale(1.3)',
  stroke: hovering ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
}));

export const FeaturedPin = styled(AssistantTwoToneIcon)(({ hovering, theme }) => ({
  color: hovering ? 'rgba(255, 187, 0, 0.5)' : 'blue',
  fontSize: '2.5rem',
  zIndex: 4,
  transition: 'all 0.5s',
  transform: hovering && 'scale(1.3)',
  stroke: hovering ? theme.palette.primary.main : 'rgba(255, 255, 255, 0.3)',
  cursor: 'pointer',
}));
