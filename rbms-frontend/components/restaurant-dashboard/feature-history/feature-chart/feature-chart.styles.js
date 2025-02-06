import { styled, Alert } from '@mui/material';
import { FlexContainer, PaddedButton } from '@/components/UI';

export const Option = styled(PaddedButton)(({ theme, selected }) => ({
  backgroundColor: selected ? theme.palette.secondary.main : theme.palette.static.primary,
  color: selected ? theme.palette.text.primary : theme.palette.text.secondary,
  padding: `${theme.spacing(0.5)} ${theme.spacing(1.5)}`,
  '&:hover': {
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.main,
  },
}));

export const OptionContainer = styled(FlexContainer)(({ theme }) => ({
  gap: theme.spacing(1),
  justifyContent: 'right',
  marginBottom: theme.spacing(1),
  flexWrap: 'wrap',
}));

export const StyledAlert = styled(Alert)(({ theme }) => ({
  width: '50%',
}));
