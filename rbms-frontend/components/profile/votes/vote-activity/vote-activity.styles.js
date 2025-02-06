import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const VoteActivity = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  cursor: 'pointer',
  padding: theme.spacing(1),
  borderRadius: 10,
  transition: 'all 0.25s',

  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
}));
