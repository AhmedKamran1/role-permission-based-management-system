import { styled } from '@mui/material';
import { DashboardContent } from '@/components/UI';

export const DeletePopper = styled(DashboardContent)(({ theme, open }) => ({
  position: 'fixed',
  bottom: 50,
  left: '60%',
  transform: 'translate(-50%, 0)',
  transition: 'all 0.5s',
  opacity: open ? 1 : 0,
  backgroundColor: 'white',
  zIndex: 10,
  padding: 0,
  [theme.breakpoints.down('md')]: {
    padding: 0,
  },
}));
