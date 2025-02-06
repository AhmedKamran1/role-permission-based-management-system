import { styled, Box } from '@mui/material';
import { Text } from '@/components/UI';

export const FilterContainer = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  width: '30%',

  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

export const ResetText = styled(Text)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  textDecoration: 'underline',
  cursor: 'pointer',
  fontWeight: 500,
}));
