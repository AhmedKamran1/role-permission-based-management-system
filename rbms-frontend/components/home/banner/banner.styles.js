import { FlexContainer } from '@/components/UI';
import { Box, styled } from '@mui/material';
import Image from 'next/image';

export const Header = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  fontWeight: 'bold',
  width: '50%',
  animation: 'fadeInOut 0.5s linear',
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0.5,
    },
    '100%': {
      opacity: 1,
    },
  },

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const BannerContainer = styled(Box)(({ theme }) => ({
  height: '100%',
  minHeight: '500px',
  width: '100%',
  height: '60vh',
  position: 'relative',
  top: 0,

  '&:before': {
    content: `""`,
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    backgroundColor: 'black',
    opacity: 0.6,
  },
}));

export const ProgressContainer = styled(Box)(({ theme }) => ({
  width: '65px',
  borderRadius: '10px',
  height: '12px',
  backgroundColor: theme.palette.static.primary,
  [theme.breakpoints.down('md')]: {
    height: '10px',
    width: '50px',
  },
}));

export const Progress = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  borderRadius: '10px',
  height: '100%',
  transition: 'all 4s linear',
}));

export const BannerTextContainer = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(2),
  padding: `${theme.spacing(0)} ${theme.spacing(2)}`,
  color: theme.palette.static.primary,
  width: '100%',
  height: '100%',
  position: 'absolute',
  zIndex: 2,
}));

export const StyledImage = styled(Image)(({}) => ({
  objectFit: 'cover',
  animation: 'fadeInOut 0.5s linear',
  '@keyframes fadeInOut': {
    '0%': {
      opacity: 0.8,
      transform: 'scale(0.99)',
    },
    '100%': {
      opacity: 1,
      transform: 'scale(1)',
    },
  },
}));
