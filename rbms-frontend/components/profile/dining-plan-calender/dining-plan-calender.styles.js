import { styled } from '@mui/material';
import { PickersDay } from '@mui/x-date-pickers';

export const HighlightedDay = styled(PickersDay)(({ theme }) => ({
  '&.Mui-selected': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.primary,
  },
}));
