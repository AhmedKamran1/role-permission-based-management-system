import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useFormik } from 'formik';

import dayjs from 'dayjs';

import { enqueueSnackbar } from 'notistack';

// Styles
import * as Styles from './dining-plan-modal.styles';
import {
  Autocomplete,
  Box,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Rating,
} from '@mui/material';
import {
  FlexContainer,
  InputField,
  ModalCancelIcon,
  PrimaryButton,
  Text,
} from '@/components/UI';
import { DateTimePicker, renderTimeViewClock } from '@mui/x-date-pickers';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import CancelIcon from '@mui/icons-material/Cancel';

// Utils
import { diningPlanSchema } from '@/utils/validation-schema/dining-plan';

// Services
import { connectToMeilisearch } from '@/services/meilisearch';
import { addPlan } from '@/services/dining-plan';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';

const client = connectToMeilisearch();

const TextField = React.forwardRef((props, ref) => (
  <InputField
    {...props}
    ref={ref}
    name="date"
    label="Plan Date"
    variant="outlined"
    placeholder="Enter Date"
  />
));

const DiningPlanModal = ({ plan, showModal, handleCloseModal, updateHandler }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [invitees, setInvitees] = useState(plan?.invitees || []);
  const [restaurant, setRestaurant] = useState((plan && plan.restaurant) || null);
  const [dateError, setDateError] = useState(null);

  const restaurantDetails = useRef((plan && plan.restaurant) || null);

  const submitHandler = async (values) => {
    let updatedInvitees;

    values.title = values.title.trim();
    values.description = values.description.trim();

    if (values.invitees !== '') {
      updatedInvitees = [...invitees, values.invitees];
    } else {
      updatedInvitees = [...invitees];
    }

    const updatedValues = {
      ...values,
      invitees: updatedInvitees,
      date: values.date?.$d?.toISOString(),
      restaurant: restaurantDetails.current.id,
    };

    try {
      formik.setSubmitting(true);
      if (plan) {
        await updateHandler(updatedValues);
        enqueueSnackbar({
          variant: 'success',
          message: 'Dining Plan Updated.',
        });
      } else {
        await addPlan(updatedValues);
        enqueueSnackbar({
          variant: 'success',
          message: 'Dining Plan Created.',
        });
      }
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
      });
    } finally {
      formik.resetForm();
      formik.setSubmitting(false);
      handleCloseModal();
    }
  };

  const formik = useFormik({
    initialValues: {
      title: plan?.title || '',
      invitees: '',
      description: plan?.description || '',
      date: (plan?.date && dayjs(plan?.date)) || null,
      restaurant: plan?.restaurant?.name || '',
    },

    validationSchema: diningPlanSchema,
    validate: (values) => {
      const errors = {};
      if (invitees.length === 0 && values.invitees === '') {
        errors.invitees = 'Invitees are required.';
      }
      switch (dateError) {
        case 'maxDate': {
          errors.date = 'Max date exceeded!';
          break;
        }
        case 'disablePast': {
          errors.date = 'Past date not allowed.';
          break;
        }

        case 'invalidDate': {
          errors.date = 'Date is not valid';
          break;
        }
      }

      try {
        diningPlanSchema.validateSync(values, {
          abortEarly: false,
          excludeKeys: ['title,description,restaurant'],
        });
      } catch (validationErrors) {
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
      }

      return errors;
    },
    onSubmit: submitHandler,
  });

  const handleInviteesChange = (event) => {
    formik.handleChange(event);
    const newValue = event.target.value;
    if (newValue.endsWith(' ')) {
      const emails = newValue.trim().split(' ');
      const validEmails = emails.filter((email) => isValidEmail(email));
      invitees.push(...validEmails);
      formik.setFieldValue('invitees', '');
    }
  };

  const isValidEmail = (email) => {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
  };

  useEffect(() => {
    setLoading(true);
    client
      .index('restaurants')
      .search(formik.values.restaurant, { limit: 20 })
      .then((res) => {
        setFilteredRestaurants(res.hits);
      })
      .catch((error) => console.error('MeiliSearch Error:', error));
    setLoading(false);
  }, [formik.values.restaurant]);

  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      scroll="paper"
      fullWidth={true}
      maxWidth="sm"
      PaperProps={{
        component: 'form',
      }}
      onSubmit={formik.handleSubmit}
    >
      <ModalCancelIcon onClick={handleCloseModal}>
        <CloseIcon color="secondary" fontSize="medium" />
      </ModalCancelIcon>
      <DialogTitle>
        <Text variant="subHeader" color="text.secondary">
          Dining Plan
        </Text>
      </DialogTitle>
      <DialogContent
        dividers={true}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <Styles.Fields>
          <InputField
            name="title"
            label="Plan Title"
            variant="outlined"
            placeholder="Enter Title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.title && Boolean(formik.touched.title)}
            helperText={formik.touched.title && formik.errors.title}
          />
          <DateTimePicker
            name="date"
            label="Plan Date"
            disablePast
            value={formik.values.date}
            onError={(newValue) => setDateError(newValue)}
            onChange={(newValue) => {
              formik.setFieldValue('date', newValue);
            }}
            viewRenderers={{
              hours: renderTimeViewClock,
              minutes: renderTimeViewClock,
              seconds: renderTimeViewClock,
            }}
            slotProps={{
              textField: {
                onBlur: formik.handleBlur,
                error: formik.errors.date && Boolean(formik.touched.date),
                helperText: formik.touched.date && formik.errors.date,
              },
              day: {
                sx: {
                  color: 'text.secondary',
                  '&.Mui-selected': {
                    backgroundColor: 'secondary.main',
                    color: 'text.primary',
                  },
                  '&.Mui-selected:hover': {
                    backgroundColor: 'secondary.main',
                  },
                  '&.Mui-selected:focus': {
                    backgroundColor: 'secondary.main',
                  },
                  '&:hover': {
                    backgroundColor: 'primary.main',
                    color: 'text.primary',
                  },
                },
              },
              layout: {
                sx: {
                  color: 'secondary.main',
                  '& .MuiClock-wrapper .MuiClockNumber-root.Mui-selected': {
                    color: 'text.primary',
                  },
                  '& .MuiClock-clock': {
                    backgroundColor: 'primary.main',
                  },
                  '& .MuiClock-pin': {
                    backgroundColor: 'secondary.main',
                  },
                  '& .MuiClockPointer-root': {
                    backgroundColor: 'secondary.main',
                  },
                  '& .Mui-selected': {
                    backgroundColor: 'secondary.main',
                    color: 'text.primary',
                  },
                  '& .Mui-selected:hover': {
                    backgroundColor: 'secondary.main',
                    color: 'text.primary',
                  },
                  '& .Mui-selected:focus': {
                    backgroundColor: 'secondary.main',
                    color: 'text.primary',
                  },
                },
              },
            }}
            slots={{
              textField: TextField,
            }}
          />
        </Styles.Fields>
        <Autocomplete
          multiple
          clearIcon={false}
          value={invitees}
          onChange={(event, value) => setInvitees(value)}
          inputValue={formik.values.invitees}
          onInputChange={handleInviteesChange}
          onBlur={formik.handleBlur}
          freeSolo
          options={[]}
          renderTags={(value, getTagProps) =>
            value.map((email, index) => (
              <Chip
                label={email}
                color="primary"
                deleteIcon={
                  <IconButton>
                    <CancelIcon sx={{ color: 'white !important' }} />
                  </IconButton>
                }
                sx={{
                  color: 'text.primary',
                }}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <InputField
              {...params}
              name="invitees"
              label="Invite People"
              variant="outlined"
              placeholder="Enter Invitees Emails."
              error={formik.errors.invitees && Boolean(formik.touched.invitees)}
              helperText={formik.touched.invitees && formik.errors.invitees}
            />
          )}
        />
        <InputField
          name="description"
          label="Describe your plan."
          variant="outlined"
          placeholder="Enter Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description && Boolean(formik.touched.description)}
          helperText={formik.touched.description && formik.errors.description}
          multiline
          minRows={4}
          maxRows={6}
        />
        <Autocomplete
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onChange={(e, value) => {
            setRestaurant(value);
            restaurantDetails.current = value;
          }}
          value={restaurant}
          inputValue={formik.values.restaurant}
          onInputChange={(e, value) => formik.setFieldValue('restaurant', value)}
          onBlur={formik.handleBlur}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          getOptionLabel={(option) => `${option.name} (${option.address})`}
          options={filteredRestaurants}
          loading={loading}
          filterOptions={(x) => x}
          ListboxProps={{ style: { maxHeight: 350 } }}
          renderOption={(props, restaurant) => {
            return (
              <React.Fragment key={restaurant.id}>
                <Box component="li" {...props}>
                  <Image
                    alt="restaurant-avatar"
                    src={
                      (restaurant.cover &&
                        getFileUrl(
                          process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                          `${restaurant.id}/cover/${restaurant.cover}`
                        )) ||
                      '/assets/images/bg-placeholder.png'
                    }
                    height={50}
                    width={50}
                    style={{ marginRight: '10px', borderRadius: '2px' }}
                  />
                  <FlexContainer
                    sx={{ flexDirection: 'column', alignItems: 'flex-start' }}
                  >
                    <Text variant="sub" color="text.secondary" fontWeight={600}>
                      {restaurant.name}
                    </Text>
                    <Rating
                      value={restaurant.rating}
                      precision={0.5}
                      size="small"
                      readOnly
                    />

                    <Text variant="sub" color="text.secondary">
                      {restaurant.address}
                    </Text>
                  </FlexContainer>
                </Box>
              </React.Fragment>
            );
          }}
          renderInput={(params) => (
            <InputField
              {...params}
              name="restaurant"
              label="Restaurant Name"
              variant="outlined"
              placeholder="Type Restaurant Name being planned for."
              error={formik.errors.restaurant && Boolean(formik.touched.restaurant)}
              helperText={formik.touched.restaurant && formik.errors.restaurant}
              InputProps={{
                ...params.InputProps,
                startAdornment: restaurantDetails.current?.cover && (
                  <Image
                    alt="restaurant-avatar"
                    src={
                      (restaurantDetails.current.cover &&
                        getFileUrl(
                          process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                          `${restaurantDetails.current.id}/cover/${restaurantDetails.current.cover}`
                        )) ||
                      '/assets/images/bg-placeholder.png'
                    }
                    height={40}
                    width={40}
                    style={{ marginRight: '5px', borderRadius: '2px' }}
                  />
                ),
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
      </DialogContent>
      <DialogActions>
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          <Text variant="body">Post</Text>
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default DiningPlanModal;
