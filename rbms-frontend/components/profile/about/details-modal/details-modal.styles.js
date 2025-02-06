import { styled } from '@mui/material';
import { FlexContainer, ModalContent } from '@/components/UI';

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  gap: theme.spacing(2),
  minWidth: '300px',

  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(2),
    gap: theme.spacing(1),
  },
}));

export const NameContainer = styled(FlexContainer)(({ theme }) => ({
  gap: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
  },
}));
