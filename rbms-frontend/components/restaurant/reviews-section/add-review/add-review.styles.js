import { styled, IconButton, Box } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const ImagePlaceHolder = styled(FlexContainer)(({ theme, modal }) => ({
  flexDirection: 'column',
  height: modal ? '180px' : '130px',
  width: modal ? '100%' : '150px',
  gap: theme.spacing(1),
  border: `1px dashed ${theme.palette.primary.main}`,
  cursor: 'pointer',
  borderRadius: 10,
}));

export const ImageContainer = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  marginTop: theme.spacing(4),
  flexWrap: 'wrap',
  gap: theme.spacing(1),
}));

export const Image = styled(Box)(({ theme, modal }) => ({
  position: 'relative',
  height: modal ? '220px' : '130px',
  width: modal ? '49%' : '150px',
  [theme.breakpoints.down('sm')]: {
    width: modal ? '100%' : '150px',
  },
}));

export const ImageDeleteIcon = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 5,
  right: 5,
  padding: theme.spacing(0.5),
}));
