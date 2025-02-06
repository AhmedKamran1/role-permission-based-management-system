import { FlexContainer } from '@/components/UI';
import { CardContent, styled } from '@mui/material';

export const CardContentContainer = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  position: 'relative',
  width: '60%',
  paddingTop: `${theme.spacing(2)}`,
  paddingBottom: `${theme.spacing(1)}`,
  paddingLeft: `${theme.spacing(2)} `,
  paddingRight: `${theme.spacing(3)}`,
}));

export const IconContainer = styled(FlexContainer)(({ theme }) => ({
  justifyContent: 'left',
  gap: theme.spacing(0.5),
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}));
