import { styled } from '@mui/material';
import { FlexContainer, PrimaryButton } from '@/components/UI';

export const Container = styled(FlexContainer)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  marginTop: theme.spacing(2),
  gap: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const VoteButton = styled(PrimaryButton)(({ theme, selected }) => ({
  borderRadius: '5px',
  backgroundColor: selected ? theme.palette.primary.main : theme.palette.static.primary,
  color: selected ? theme.palette.static.primary : theme.palette.primary.main,
}));
