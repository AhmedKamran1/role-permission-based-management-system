import { styled } from '@mui/material';
import { FlexContainer, SectionContainer } from '@/components/UI';

export const AboutContainer = styled(SectionContainer)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: '600px',
  backgroundImage: `url("/assets/images/home/about.jpg")`,
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',

  '&:before': {
    content: `""`,
    height: '100%',
    width: '100%',
    position: 'absolute',
    zIndex: '1',
    backgroundColor: 'black',
    opacity: '.5',
  },
}));

export const AboutContent = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(4),
  alignItems: 'flex-start',
  width: '85%',

  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    margin: 'auto',
  },
}));
