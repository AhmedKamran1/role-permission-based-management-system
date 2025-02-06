import React, { useState } from 'react';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import * as Styles from './preview-modal.styles';
import {
  Box,
  Button,
  ImageList,
  ImageListItem,
  Input,
  Modal,
  useMediaQuery,
} from '@mui/material';
import { ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';

// Services
import { uploadRestaurantImages } from '@/services';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Utils
import { allowedImageTypes } from '@/utils/constants';

const PreviewModal = ({ images, setImages, imageChangeHandler }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { details, detailsHandler } = useRestaurantContext();
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const deleteImageHandler = (index) => {
    setImages((prevImages) => {
      prevImages.splice(index, 1);
      return prevImages.slice();
    });
  };

  const uploadImageHandler = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      images.forEach((image) => {
        formData.append('files', image);
      });
      const res = await uploadRestaurantImages(details.id, formData);
      setImages([]);
      detailsHandler({ images: res.data });
      enqueueSnackbar({ variant: 'success', message: 'Image(s) uploaded' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal open={images.length > 0} onClose={() => setImages([])}>
      <Styles.ModalContainer>
        <ModalCancelIcon onClick={() => setImages([])}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <Text variant="subHeader" fontWeight={800} mb={1.5}>
          Preview Images
        </Text>
        <Styles.ImageListContainer>
          <ImageList
            rowHeight={images.length === 1 ? 400 : 300}
            cols={images.length === 1 || isMobile ? 1 : 2}
            variant="quilted"
            gap={10}
          >
            {images.map((image, index) => (
              <ImageListItem key={index}>
                <Image
                  src={URL.createObjectURL(image)}
                  alt="preview-image"
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover', borderRadius: '5px' }}
                />
                <Styles.ImageDeleteIcon
                  disableRipple
                  sx={{ backgroundColor: 'red' }}
                  color="inherit"
                  onClick={() => deleteImageHandler(index)}
                >
                  <Delete fontSize="medium" sx={{ color: 'text.primary' }} />
                </Styles.ImageDeleteIcon>
              </ImageListItem>
            ))}
          </ImageList>
        </Styles.ImageListContainer>
        <Box mt={2}>
          <Button
            component="label"
            variant="outlined"
            sx={{ mr: 2 }}
            onChange={imageChangeHandler}
          >
            <Text variant="sub">Upload file</Text>
            <Input
              type="file"
              inputProps={{ multiple: true, accept: allowedImageTypes.join(', ') }}
              sx={{ display: 'none' }}
            />
          </Button>
          <PrimaryButton disabled={images.length === 0 || isSubmitting}>
            <Text variant="sub" onClick={uploadImageHandler}>
              Save Changes
            </Text>
          </PrimaryButton>
        </Box>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default PreviewModal;
