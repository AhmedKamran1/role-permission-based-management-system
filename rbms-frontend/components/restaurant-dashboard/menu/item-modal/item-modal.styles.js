import { Box, styled } from '@mui/material';
import { ModalContent } from '@/components/UI';

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  width: '650px',
  gap: theme.spacing(3),

  [theme.breakpoints.down('md')]: {
    width: 'auto',
    gap: theme.spacing(2),
    padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  },
}));

export const ItemDetails = styled(Box)(({ theme }) => ({
  display: 'flex',
  width: "100%",
  gap: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));
