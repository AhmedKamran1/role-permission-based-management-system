import { styled } from '@mui/material';
import { FlexContainer, PageContent } from '@/components/UI';

export const GalleryContent = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: theme.spacing(4),
  [theme.breakpoints.down('md')]: {
    alignItems: 'center',
    textAlign: 'center',
    marginTop: theme.spacing(4),
  },
}));

export const Cuisine = styled(FlexContainer)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: theme.spacing(3),
  borderRadius: '5px',
  marginBottom: theme.spacing(1),
}));

export const CuisineDetails = styled(PageContent)(({ theme }) => ({
  borderLeft: '12px solid orange',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
