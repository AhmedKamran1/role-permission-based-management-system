import { styled } from '@mui/material';
import { FlexContainer } from '@/components/UI';

export const MenuItemsContainer = styled(FlexContainer)(({ theme }) => ({
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'flex-start',
}));

export const AddItemPlaceholder = styled(FlexContainer)(({ theme }) => ({
  border: `1px dashed ${theme.palette.secondary.main}`,
  width: '220px',
  height: '275px',
  gap: theme.spacing(1),
  cursor: 'pointer',
}));
