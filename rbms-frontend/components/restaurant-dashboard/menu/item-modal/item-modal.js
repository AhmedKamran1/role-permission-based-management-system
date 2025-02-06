import React from 'react';
import Image from 'next/image';
import { useFormik } from 'formik';
import { enqueueSnackbar } from 'notistack';

import { useRestaurantContext } from '@/context/restaurant';

// Styles
import {
  Button,
  Divider,
  Input,
  InputAdornment,
  InputLabel,
  Modal,
  useMediaQuery,
} from '@mui/material';
import * as Styles from './item-modal.styles';
import {
  FlexContainer,
  InputField,
  ModalCancelIcon,
  PrimaryButton,
  Text,
} from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Services
import { addMenuItem, updateMenuItem } from '@/services';

// Utils
import { allowedImageTypes } from '@/utils/constants';
import { menuItemSchema } from '@/utils/validation-schema/restaurant';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

const ItemModal = ({
  showModal,
  setShowModal,
  itemDetails = {},
  headerTitle,
  currencyType,
}) => {
  const { details, detailsHandler } = useRestaurantContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const submitHandler = async (values) => {
    try {
      formik.setSubmitting(true);

      values.name = values.name.trim();
      values.description = values.description.trim();

      const formData = new FormData();
      for (const key in values) {
        formData.append(key, values[key]);
      }

      if (itemDetails.name) {
        const { data } = await updateMenuItem(details.id, itemDetails.id, formData);

        const menuItemIndex = details.menu.findIndex((m) => m.id === itemDetails.id);
        const updatedMenu = [...details.menu];
        updatedMenu[menuItemIndex] = data;

        detailsHandler({ menu: updatedMenu });
      } else {
        formData.append('category', itemDetails.category);
        formData.append('order', itemDetails.order);
        const { data } = await addMenuItem(details.id, formData);
        detailsHandler({ menu: [...details.menu, data] });
      }

      setShowModal(false);
    } catch (e) {
      console.log(e);
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      formik.setSubmitting(false);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: itemDetails.name || '',
      price: itemDetails.price || '',
      description: itemDetails.description || '',
      image: itemDetails.image || '',
    },
    validationSchema: menuItemSchema,
    onSubmit: submitHandler,
  });

  return (
    <Modal open={showModal} onClose={() => setShowModal(false)}>
      <Styles.ModalContainer component="form" onSubmit={formik.handleSubmit}>
        <ModalCancelIcon onClick={() => setShowModal(false)}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <Text variant="subHeader" fontWeight={800}>
          {headerTitle}
        </Text>
        <Styles.ItemDetails>
          <FlexContainer gap={2} flexDirection="column" width={'100%'}>
            <InputField
              name="name"
              label="Name"
              fullWidth
              variant="outlined"
              placeholder="Enter Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.name && Boolean(formik.touched.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
            <InputField
              name="price"
              label="Price"
              variant="outlined"
              placeholder="Enter Price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.errors.price && Boolean(formik.touched.price)}
              helperText={formik.touched.price && formik.errors.price}
              InputProps={{
                startAdornment: <InputAdornment position="start">US$</InputAdornment>,
              }}
            />
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
              rows={3}
            />
          </FlexContainer>
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            variant="middle"
            flexItem
          />
          <FlexContainer gap={1} flexDirection="column">
            <Image
              src={
                (formik.values.image === itemDetails.image &&
                  getFileUrl(
                    process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                    `${details.id}/menu/${itemDetails.image}`
                  )) ||
                (formik.values.image && URL.createObjectURL(formik.values.image)) ||
                '/assets/images/bg-placeholder.png'
              }
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              alt={'menu-item'}
              height={230}
              width={260}
              style={{ borderRadius: '5px' }}
            />
            <InputLabel htmlFor="menu-item-image">
              <Button variant="outlined" component="label" startIcon={<CameraAltIcon />}>
                <Text variant="body" color="primary">
                  Change Image
                </Text>
                <Input
                  id="menu-item-image"
                  type="file"
                  sx={{ display: 'none' }}
                  inputProps={{ accept: allowedImageTypes.join(', ') }}
                  onChange={(event) => {
                    if (event.currentTarget.files.length > 0) {
                      formik.setFieldValue('image', event.currentTarget.files[0]);
                    }
                  }}
                />
              </Button>
            </InputLabel>
          </FlexContainer>
        </Styles.ItemDetails>
        <PrimaryButton
          type="submit"
          disabled={formik.isSubmitting || !formik.values.image}
        >
          <Text variant="body">Submit</Text>
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default ItemModal;
