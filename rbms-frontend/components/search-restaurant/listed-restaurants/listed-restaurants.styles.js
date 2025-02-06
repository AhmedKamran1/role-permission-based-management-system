import { Box, styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const SearchContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
}));

export const Search = styled(Box)(({ theme }) => ({
  width: '70%',
  paddingLeft: theme.spacing(2),
  paddingTop: theme.spacing(2),

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

export const SearchFields = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  marginBottom: theme.spacing(2),
  gap: theme.spacing(2),
  padding: `0 ${theme.spacing(1)}`,
  flexWrap: 'wrap',
}));

export const IconContainer = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
}));

export const ListContainer = styled(Box)(({ theme }) => ({
  height: '72vh',
  minHeight: '600px',
  overflowY: 'auto',
}));

export const RestaurantContainer = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

export const RestaurantImage = styled(Box)(({ theme }) => ({
  height: '190px',
  width: '35%',
  position: 'relative',
}));

export const RestaurantContent = styled(Box)(({ theme }) => ({
  width: '65%',
  paddingRight: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  [theme.breakpoints.down('md')]: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(2),
  },
}));

export const Cuisines = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  gap: theme.spacing(0.5),
  flexWrap: 'wrap',
}));
