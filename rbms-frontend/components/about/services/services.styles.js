import { styled, Box, CardContent, Card } from '@mui/material';

export const ServicesContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '600px',
  backgroundColor: theme.palette.primary.main,
  textAlign: 'center',
  padding: `${theme.spacing(8)} ${theme.spacing(2)}`,
  marginBottom: theme.spacing(40),

  [theme.breakpoints.down('md')]: {
    marginBottom: 0,
    height: 'auto',
  },
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  borderRadius: '20px',
  transition: 'all 0.25s',

  '&:hover': {
    boxShadow: '0px 2px 15px grey',
    marginTop: -10,
  },
}));

export const CardContentContainer = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));
