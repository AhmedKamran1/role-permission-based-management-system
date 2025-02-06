import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { userActions } from '@/store/user/userSlice';
import { useProfileContext } from '@/context/profile';

// Services
import { updateProfileDetails } from '@/services';

// Utils
import { profileSchema } from '@/utils/validation-schema/profile';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Styles
import * as Styles from './details-modal.styles';
import { IconButton, Modal } from '@mui/material';
import { InputField, PrimaryButton, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import Location from './location/location';

const DetailsModal = ({ showModal, closeModal }) => {
  const dispatch = useDispatch();

  const { details, detailsHandler } = useProfileContext();
  const { firstName, lastName, description } = details;

  const [location, setLocation] = useState(details.location);

  const updateLocation = (data) => {
    setLocation(data);
  };

  const submitHandler = async (values) => {
    try {
      formik.setSubmitting(true);

      if (location.coordinates) {
        values.location = location;
      }

      values.description = values.description.trim();

      await updateProfileDetails(values);
      dispatch(userActions.updateDetails(values))
      detailsHandler(values);

      enqueueSnackbar({
        variant: 'success',
        message: 'Profile Updated',
        onEnter: () => closeModal(),
      });
    } catch (e) {
      enqueueSnackbar({
        variant: 'error',
        message: getError(e),
        onExited: () => closeModal(),
      });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      firstName: firstName,
      lastName: lastName,
      description: description,
    },
    validationSchema: profileSchema,
    onSubmit: submitHandler,
  });

  return (
    <Modal open={showModal} onClose={closeModal}>
      <Styles.ModalContainer component="form" onSubmit={formik.handleSubmit}>
        <IconButton
          sx={{ position: 'absolute', top: '10px', right: '10px' }}
          onClick={closeModal}
        >
          <CloseIcon color="secondary" fontSize="medium" />
        </IconButton>
        <Text variant="subHeader" fontWeight={800} mb={1.5}>
          Update Profile
        </Text>
        <Styles.NameContainer>
          <InputField
            name="firstName"
            label="First Name"
            variant="outlined"
            placeholder="Enter First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.firstName && Boolean(formik.touched.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
          <InputField
            name="lastName"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.errors.lastName && Boolean(formik.touched.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Styles.NameContainer>
        <InputField
          name="description"
          label="Description"
          variant="outlined"
          placeholder="Enter Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.errors.description && Boolean(formik.touched.description)}
          helperText={formik.touched.description && formik.errors.description}
          multiline
          minRows={2}
          maxRows={4}
        />
        <Location location={location} updateLocation={updateLocation} />
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          <Text variant="body">Save Changes</Text>
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default DetailsModal;
