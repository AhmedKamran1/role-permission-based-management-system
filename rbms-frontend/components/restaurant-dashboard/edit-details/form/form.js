import React, { useState, useEffect, useMemo } from 'react';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Components
import Location from '../location/location';

// Styles
import * as Styles from './form.styles';
import {
  Text,
  DashboardContent,
  FormButton,
  FormContainer,
  InputField,
  SelectField,
} from '@/components/UI';
import {
  AlertTitle,
  Box,
  Chip,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Tooltip,
  useMediaQuery,
} from '@mui/material';

// Services
import { updateRestaurantDetails } from '@/services';

// Helpers
import { fetchCountry } from '@/helpers/mapHelpers';
import { getError } from '@/helpers/snackbarHelpers';

// Utils
import { restaurantEditSchema } from '@/utils/validation-schema/restaurant';
import { PhoneInputCustom } from '@/utils/phone-input';
import { Status, categoryTypes } from '@/utils/constants';

// Icons
import CancelIcon from '@mui/icons-material/Cancel';
import VerifiedIcon from '@mui/icons-material/Verified';
import UnVerifiedIcon from '@mui/icons-material/NewReleases';
import OtpModal from '@/components/modal/otp-modal/otp-modal';

const EditDetailsForm = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  const { details, detailsHandler } = useRestaurantContext();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [location, setLocation] = useState({
    coordinates: [null, null],
    country: '',
  });

  useEffect(() => {
    if (details.location) {
      setLocation(details.location);
    }
  }, [details.location]);

  const initialValues = useMemo(() => {
    return {
      taxId: details.taxId || '',
      name: details.name || '',
      categories: details.categories || [],
      phoneNumber: details.phoneNumber || '',
      address: details.address || '',
      place: location.country || '',
    };
  }, [details, location]);

  const updateLocation = async (data) => {
    const loc = await fetchCountry(data[0], data[1]);
    setLocation(loc);
  };

  const submitHandler = async (values) => {
    try {
      formik.setSubmitting(true);
      const { place, ...payload } = values;
      payload.location = location;

      const { data } = await updateRestaurantDetails(details.id, payload);
      detailsHandler(data);
      formik.resetForm();

      enqueueSnackbar({
        variant: 'success',
        message: 'Restaurant Details Updated',
      });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: restaurantEditSchema,
    enableReinitialize: true,
    onSubmit: submitHandler,
  });

  const contactChangeHandler = (phoneNumber) => {
    formik.setFieldValue('phoneNumber', phoneNumber);
  };

  const handleDelete = (index) => {
    const updatedCategory = [...formik.values.categories];
    updatedCategory.splice(index, 1);
    formik.setFieldValue('categories', updatedCategory);
  };

  return (
    <DashboardContent>
      {showOtpModal && (
        <OtpModal
          showModal={showOtpModal}
          handleCloseModal={() => setShowOtpModal(false)}
          restaurantId={details.id}
          phoneNumber={formik.values.phoneNumber}
        />
      )}
      {details.status === Status.APPROVED && (
        <Styles.StyledAlert severity="warning">
          <AlertTitle>
            <Text variant="body" fontWeight={800}>
              Warning
            </Text>
          </AlertTitle>
          <Text variant="body" fontWeight={500}>
            Updating
            <Text variant="body" fontWeight={800} mr={1} ml={1}>
              Restaurant Name / Tax ID
            </Text>
            will be updated after approval by admin
          </Text>
        </Styles.StyledAlert>
      )}
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12} lg={5}>
          <FormContainer component="form" onSubmit={formik.handleSubmit}>
            <Text variant="subHeader" textAlign={'center'} fontWeight={500}>
              Update Restaurant Details
            </Text>
            <Text variant="sub" textAlign={'center'} mb={3}>
              Following information will be shown on the page so that customers can search
              and contact you.
            </Text>
            <InputField
              name="name"
              label="Restaurant Name"
              variant="outlined"
              placeholder="Enter Restaurant Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name && Boolean(formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
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
                        sx={{
                          color: 'text.primary',
                        }}
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
                endAdornment: (
                  <InputAdornment position="end" sx={{ cursor: 'pointer' }}>
                    {details.isVerified ? (
                      <Tooltip title="Verified" arrow>
                        <VerifiedIcon />
                      </Tooltip>
                    ) : (
                      <Tooltip
                        title="Verify Now"
                        arrow
                        onClick={() => setShowOtpModal(true)}
                      >
                        <UnVerifiedIcon sx={{ fill: '#ff7675' }} />
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
            />
            <InputField
              name="taxId"
              label="Restaurant Tax ID"
              variant="outlined"
              placeholder="Enter Restaurant Tax ID"
              value={formik.values.taxId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.taxId && Boolean(formik.touched.taxId)}
              helperText={formik.touched.taxId && formik.errors.taxId}
            />
            <InputField
              name="address"
              label="Restaurant Address"
              variant="outlined"
              placeholder="Enter Restaurant Address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.address && Boolean(formik.touched.address)}
              helperText={formik.touched.address && formik.errors.address}
            />
            <InputField
              name="place"
              label="Location"
              variant="outlined"
              placeholder="Location"
              value={formik.values.place}
              disabled
            />
            {isMobile && (
              <Box sx={{ height: '300px' }}>
                <Location location={location} updateLocation={updateLocation} />
              </Box>
            )}
            <FormButton type="submit" disabled={formik.isSubmitting}>
              <Text variant="sub">Update Details</Text>
            </FormButton>
          </FormContainer>
        </Grid>
        <Divider
          orientation="vertical"
          flexItem
          variant="middle"
          sx={{ display: { xs: 'none', lg: 'block' } }}
        />
        {!isMobile && (
          <Grid
            item
            xs={0}
            lg={6}
            sx={{
              position: 'relative',
              height: '700px',
              ml: 3,
            }}
          >
            <Location location={location} updateLocation={updateLocation} />
          </Grid>
        )}
      </Grid>
    </DashboardContent>
  );
};

export default EditDetailsForm;
