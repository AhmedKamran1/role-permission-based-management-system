import { StepConnector, stepConnectorClasses, styled } from '@mui/material';

export const StyledConnectorIcons = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.static.ternary,
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.active && {
    boxShadow: `0 0 20px 2px ${theme.palette.primary.main}`,
    backgroundColor: theme.palette.primary.main,
  }),
  ...(ownerState.completed && {
    backgroundColor: theme.palette.secondary.main,
  }),
}));

export const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.secondary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: '3px',
    border: 'none',
    backgroundColor: theme.palette.static.ternary,
  },
}));
