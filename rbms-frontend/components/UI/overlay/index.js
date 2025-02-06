import { Box, styled } from '@mui/material';

export const Overlay = styled(Box)({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.18)',
  zIndex: -1,
});
