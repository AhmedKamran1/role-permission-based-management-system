import { styled } from '@mui/material';
import { FlexContainer, PageContent } from '@/components/UI';

export const InformationContent = styled(PageContent)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-evenly',
  alignItems: 'center',
  gap: theme.spacing(4),
  borderRadius: '50px',
  textAlign: 'center',
  paddingTop: theme.spacing(6),
  paddingBottom: theme.spacing(6),
  backgroundColor: theme.palette.static.primary,

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    padding: `${theme.spacing(3)} ${theme.spacing(6)}`,
  },
}));

export const IconContainer = styled(FlexContainer)(({ theme }) => ({
  height: '40px',
  width: '40px',
  borderRadius: '50%',
  backgroundColor: theme.palette.primary.main,
}));
