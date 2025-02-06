import { TextField, styled } from '@mui/material';
import { baseFontSizes } from '../typography/font-sizes';

import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/high-res.css';

export const InputField = styled(TextField)(({ theme }) => ({
  width: '100%',
  '& .MuiOutlinedInput-root': {
    color: theme.palette.static.secondary,
  },

  '& .MuiFormHelperText-root': {
    fontSize: baseFontSizes.sub.default,
    margin: 0,
  },

  '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },

  '& .MuiSvgIcon-root': {
    color: theme.palette.primary.main,
  },
}));

export const StyledPhoneInput = styled(PhoneInput)(({ theme }) => ({
  '&.react-phone-number': {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    WebkitAppearance: 'none',
  },
  '&.react-phone-number input.form-control': {
    width: '100%',
    height: '100%',
    border: 'none',
    backgroundColor: 'transparent',
  },

  '&.react-phone-number div.flag-dropdown': {
    border: 'none',
    backgroundColor: 'transparent',
  },
}));
