import React from 'react';
import { useFormik } from 'formik';

// Components
import ListingConfirmation from '@/components/restaurant-listing/listing-confirmation/listing-confirmation';

// Styles
import {
  CustomCheckbox,
  FlexContainer,
  FormContainer,
  InputField,
  PrimaryButton,
  SelectField,
  Text,
} from '@/components/UI';
import {
  Box,
  Button,
  Chip,
  FormControl,
  FormControlLabel,
  FormGroup,
  IconButton,
  InputLabel,
  MenuItem,
} from '@mui/material';

// Icons
import CancelIcon from '@mui/icons-material/Cancel';

// Utils
import { restaurantLeglitiesSchema } from '@/utils/validation-schema/restaurant';
import { PhoneInputCustom } from '@/utils/phone-input';
import { categoryTypes } from '@/utils/constants';

const DetailsForm = ({
  activeStep,
  handleNext,
  handleBack,
  legalValues,
  locationValues,
}) => {
  const contactChangeHandler = (phoneNumber) => {
    formik.setFieldValue('phoneNumber', phoneNumber);
  };

  const handleDelete = (index) => {
    const updatedCategory = [...formik.values.categories];
    updatedCategory.splice(index, 1);
    formik.setFieldValue('categories', updatedCategory);
  };

  const formik = useFormik({
    validateOnMount: true,
    initialValues: {
      categories: [],
      phoneNumber: '',
      contactAgreement: false,
    },
    validationSchema: restaurantLeglitiesSchema,
  });

  return (
    <React.Fragment>
      {activeStep === 2 ? (
        <FormContainer>
          <Text variant="header" textAlign={'center'} fontWeight={800}>
            Tell us about your Restaurant
          </Text>
          <Text variant="sub" textAlign={'center'} mb={3}>
            This information will be shown on the page so that customers can search and
            contact you.
          </Text>
          <FormControl
            error={formik.errors.categories && Boolean(formik.touched.categories)}
          >
            <InputLabel>Category</InputLabel>
            <SelectField
              name="categories"
              multiple
              label="Categories"
              value={formik.values.categories}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              MenuProps={{ PaperProps: { sx: { maxHeight: 400 } } }}
              renderValue={(selected) => (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {selected.map((value, index) => (
                    <Chip
                      key={value}
                      label={value}
                      color="primary"
                      deleteIcon={
                        <IconButton>
                          <CancelIcon
                            sx={{ color: 'white' }}
                            onMouseDown={(event) => event.stopPropagation()}
                          />
                        </IconButton>
                      }
                      onDelete={() => handleDelete(index)}
                      sx={{ color: 'text.primary' }}
                    />
                  ))}
                </Box>
              )}
            >
              {categoryTypes.map((category) => (
                <MenuItem key={category} value={category}>
                  <Text variant="sub" color="text.secondary" fontWeight={500}>
                    {category}
                  </Text>
                </MenuItem>
              ))}
            </SelectField>
            {formik.touched.categories && formik.errors.categories && (
              <Text variant="sub" color="error">
                {formik.errors.categories}
              </Text>
            )}
          </FormControl>
          <InputField
            name="phoneNumber"
            variant="outlined"
            onChange={contactChangeHandler}
            onBlur={formik.handleBlur}
            value={formik.values.phoneNumber}
            error={formik.errors.phoneNumber && Boolean(formik.touched.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            InputProps={{
              inputComponent: PhoneInputCustom,
            }}
          />
          <FormGroup>
            <FormControlLabel
              control={
                <CustomCheckbox
                  name="contactAgreement"
                  value={formik.values.contactAgreement}
                  checked={formik.values.contactAgreement}
                  onChange={formik.handleChange}
                />
              }
              label="I agree that my phone is correct"
            />
          </FormGroup>
          <FlexContainer sx={{ justifyContent: 'space-between', mt: 2 }}>
            <Button variant="outlined" onClick={handleBack}>
              <Text variant="body">Back</Text>
            </Button>
            <PrimaryButton onClick={handleNext} disabled={!formik.isValid}>
              <Text variant="body">Next</Text>
            </PrimaryButton>
          </FlexContainer>
        </FormContainer>
      ) : (
        <ListingConfirmation
          activeStep={activeStep}
          handleBack={handleBack}
          legalValues={legalValues}
          locationValues={locationValues}
          detailValues={formik.values}
        />
      )}
    </React.Fragment>
  );
};

export default DetailsForm;
