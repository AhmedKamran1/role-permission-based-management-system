import { Box, styled } from '@mui/material';
import { DetailsContainer, FlexContainer } from '@/components/UI';

export const AboutContainer = styled(DetailsContainer)(({ theme }) => ({
  '&::after': {
    content: '""',
    display: 'block',
    height: '70px',
  },

  [theme.breakpoints.down('lg')]: {
    maxWidth: 'none',
  },
}));

export const IconContainer = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  marginTop: theme.spacing(2),
  marginBottom: theme.spacing(1),
  gap: theme.spacing(1),
}));

export const ProfileAvatarContainer = styled(Box)(({ theme }) => ({
  height: 150,
  width: 150,
  position: 'absolute',
  top: -75,
  left: '50%',
  transform: 'translateX(-50%)',
}));

export const AvatarConfirmation = styled(FlexContainer)(({ theme }) => ({
  position: 'relative',
  top: -20,
}));

export const Details = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  position: 'relative',
  top: 70,
  padding: theme.spacing(1),
}));
