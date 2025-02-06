import { styled } from '@mui/material';
import { ModalContent } from '@/components/UI';
import { MuiOtpInput } from 'mui-one-time-password-input';

export const StyledOtp = styled(MuiOtpInput)(({ theme }) => ({
  input: {
    color: theme.palette.text.secondary,
  },
  '& .MuiOtpInput-TextField:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.secondary.main,
  },

  [theme.breakpoints.down('md')]: {
    width: '280px',
  },
}));

export const ModalContainer = styled(ModalContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  maxWidth: '500px',
  minWidth: '300px',
  backgroundColor: theme.palette.text.primary,
  border: 'none',
  gap: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
}));
