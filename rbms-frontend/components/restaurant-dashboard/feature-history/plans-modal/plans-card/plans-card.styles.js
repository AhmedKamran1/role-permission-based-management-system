import { styled } from '@mui/material';
import { DashboardContent } from '@/components/UI';

export const PlanContainer = styled(DashboardContent)(({ theme, selected }) => ({
  position: 'relative',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'all 0.25s',
  backgroundColor: selected && theme.palette.secondary.main,
  border:`1px solid ${theme.palette.primary.main}`,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    '& *': {
      color: theme.palette.text.primary,
    },
  },
  '& *': {
    color: selected && theme.palette.text.primary,
  },
}));
