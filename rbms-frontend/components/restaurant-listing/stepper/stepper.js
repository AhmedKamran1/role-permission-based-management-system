import React from 'react';

// Styles
import { StyledConnectorIcons } from './stepper.styles';

// Icons
import DescriptionIcon from '@mui/icons-material/Description';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import SecurityIcon from '@mui/icons-material/Security';

const CustomLabels = (props) => {
  const { active, completed, className } = props;

  const icons = {
    1: <DescriptionIcon />,
    2: <EditLocationIcon />,
    3: <SecurityIcon />,
  };

  return (
    <StyledConnectorIcons ownerState={{ completed, active }} className={className}>
      {icons[String(props.icon)]}
    </StyledConnectorIcons>
  );
};
export default CustomLabels;
