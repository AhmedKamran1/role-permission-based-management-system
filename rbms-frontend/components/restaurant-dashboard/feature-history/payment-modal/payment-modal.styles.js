import { styled } from '@mui/material';
import { ModalContent } from '@/components/UI';

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  minWidth: '300px',
}));
