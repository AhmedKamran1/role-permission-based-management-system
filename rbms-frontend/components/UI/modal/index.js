import { Box, IconButton, styled } from '@mui/material';

export const ModalContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  borderRadius: '5px',
  boxShadow: '24',
  padding: theme.spacing(4),
}));

export const ModalCancelIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '10px',
  right: '10px',
}));

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '350px',
  maxWidth: '500px',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  gap: theme.spacing(1),
}));
