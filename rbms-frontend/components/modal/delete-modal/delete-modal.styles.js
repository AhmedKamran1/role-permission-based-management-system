import { styled } from '@mui/material';
import { ModalContent } from '@/components/UI';

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  height: '350px',
  maxWidth: '500px',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  gap: theme.spacing(2.5),
}));
