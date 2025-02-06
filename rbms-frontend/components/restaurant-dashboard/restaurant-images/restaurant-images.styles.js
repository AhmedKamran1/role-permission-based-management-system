import Image from 'next/image';

import { ImageListItem, styled } from '@mui/material';
import { DashboardContent, FlexContainer } from '@/components/UI';

export const ImagePlaceHolder = styled(FlexContainer)(({ theme }) => ({
  flexDirection: 'column',
  gap: theme.spacing(3),
  padding: theme.spacing(6),
  border: `1px dashed ${theme.palette.primary.main}`,
  cursor: 'pointer',
  borderRadius: 10,

  [theme.breakpoints.down('md')]: {
    gap: theme.spacing(2),
    padding: theme.spacing(1.5),
  },
}));

export const ImagePlaceContainer = styled(DashboardContent)(({ theme }) => ({
  width: '60%',
  padding: theme.spacing(4),
  borderRadius: 10,
  margin: 'auto',
  transform: 'translate(0,50%)',
  textAlign: 'center',

  [theme.breakpoints.down('lg')]: {
    width: '80%',
    padding: theme.spacing(2),
  },

  [theme.breakpoints.down('md')]: {
    width: '90%',
  },
}));

export const StyledImage = styled(Image)(({ theme, selected }) => ({
  objectFit: 'cover',
  borderRadius: '5px',
  border: '2px solid transparent',
  borderColor: selected && theme.palette.secondary.main,
}));

export const StyledImageListItem = styled(ImageListItem)(({ selected }) => ({
  cursor: 'pointer',
  '&:before': {
    content: `""`,
    transition: 'all 0.5s',
    borderRadius: '5px',
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: '0',
    zIndex: '1',
    backgroundColor: selected && 'rgba(255, 187, 0, 0.2)',
    opacity: '.5',
  },
  '&:hover:before': {
    backgroundColor: 'rgba(255, 187, 0, 0.3)',
  },
}));

export const DeletePopper = styled(DashboardContent)(({ theme, open }) => ({
  position: 'absolute',
  bottom: 50,
  left: '55%',
  transform: 'translate(-50%, 0)',
  transition: 'all 0.5s',
  opacity: open ? 1 : 0,
  backgroundColor: 'white',
  zIndex: 10,
  width: '275px',

  [theme.breakpoints.down('md')]: {
    width: '225px',
  },
}));
