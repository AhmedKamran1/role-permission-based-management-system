import { styled } from '@mui/material';
import { FlexContainer, PageContent } from '@/components/UI';

export const Card = styled(PageContent)(({ theme }) => ({
  borderRadius: '20px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(2),
  transition: 'all 0.25s',
  cursor: 'pointer',

  '&:hover': {
    transform: 'scale(1.05)',
  },

  '&:active': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));

export const ImageContainer = styled(FlexContainer)(({ theme }) => ({
  height: '110px',
  width: '110px',
  borderRadius: '50%',
  backgroundColor: '#FFD47E',
}));

export const Header = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  textAlign: 'center',
  marginBottom: theme.spacing(5),
  gap: theme.spacing(2),
}));
