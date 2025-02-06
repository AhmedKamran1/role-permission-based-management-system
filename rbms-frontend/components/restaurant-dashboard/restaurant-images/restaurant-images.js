import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import * as Styles from './restaurant-images.styles';
import {
  DashboardContainer,
  DashboardContent,
  FlexContainer,
  PrimaryButton,
  Text,
} from '@/components/UI';
import {
  Grid,
  IconButton,
  ImageList,
  ImageListItemBar,
  Input,
  Tooltip,
  useMediaQuery,
} from '@mui/material';

// Icons
import UploadFile from '@mui/icons-material/UploadFile';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseIcon from '@mui/icons-material/Close';
import Delete from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Modals
import PreviewModal from './preview-modal/preview-modal';
import DeleteModal from '@/components/modal/delete-modal/delete-modal';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getFileUrl, validateImage } from '@/helpers/fileHelpers';

// Utils
import { allowedImageTypes } from '@/utils/constants';
import { deleteRestaurantImages } from '@/services';

const RestaurantImages = () => {
  const { details, detailsHandler } = useRestaurantContext();
  const images = details.images;

  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImages, setPreviewImages] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const imageChangeHandler = (event) => {
    try {
      const newImages = event.target.files;
      if (images.length + previewImages.length + newImages.length > 10) {
        throw new Error('Maximum 10 images allowed');
      }
      for (const file of newImages) validateImage(file);
      setPreviewImages((prev) => [...prev, ...newImages]);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  const imageSelectionHandler = (index) => {
    setSelectedImages((prevState) =>
      prevState.includes(index)
        ? prevState.filter((prevIndex) => prevIndex !== index)
        : [...prevState, index]
    );
  };

  const deleteImageHandler = async () => {
    const removedImages = [];
    const updatedImages = images.filter((v, i) => {
      if (selectedImages.includes(i)) {
        removedImages.push(v);
        return false;
      }
      return true;
    });

    await deleteRestaurantImages(details.id, { images: removedImages });
    detailsHandler({ images: updatedImages });
    setSelectedImages([]);
    closeDeleteModal();
    enqueueSnackbar({ variant: 'success', message: 'Image(s) deleted' });
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <React.Fragment>
      <PreviewModal
        images={previewImages}
        setImages={setPreviewImages}
        imageChangeHandler={imageChangeHandler}
      />
      <DeleteModal
        handleCloseModal={closeDeleteModal}
        showModal={showDeleteModal}
        deleteHandler={deleteImageHandler}
      />
      <DashboardContainer container>
        {!images.length ? (
          <Styles.ImagePlaceContainer>
            <Styles.ImagePlaceHolder component="label" onChange={imageChangeHandler}>
              <CloudUploadIcon color="primary" sx={{ fontSize: '5rem' }} />
              <Text variant="main" fontWeight={500}>
                Upload Your Images By Clicking Here.
              </Text>
              <Text variant="sub" fontWeight={500}>
                Supported file types are:&nbsp; (
                {allowedImageTypes
                  .map((type) => type.split('/')[1].toUpperCase())
                  .join(' / ')}
                )
              </Text>
              <Input
                type="file"
                inputProps={{ multiple: true, accept: allowedImageTypes.join(', ') }}
                sx={{ display: 'none' }}
              />
            </Styles.ImagePlaceHolder>
          </Styles.ImagePlaceContainer>
        ) : (
          <Grid item xs={12}>
            <DashboardContent>
              <FlexContainer
                sx={{ justifyContent: 'space-between', mb: 3, flexWrap: 'wrap' }}
              >
                <Text variant="subHeader" fontWeight={500}>
                  Restaurant Images
                </Text>
                <Tooltip
                  title="Maximum 10 images allowed"
                  open={images.length === 10}
                  placement="top"
                  arrow
                >
                  <PrimaryButton
                    component="label"
                    variant="contained"
                    startIcon={<UploadFile />}
                    onChange={imageChangeHandler}
                    disabled={images.length === 10}
                    sx={{ ml: 'auto' }}
                  >
                    <Text variant="body">Upload file</Text>
                    <Input
                      type="file"
                      inputProps={{
                        multiple: true,
                        accept: allowedImageTypes.join(', '),
                      }}
                      sx={{ display: 'none' }}
                    />
                  </PrimaryButton>
                </Tooltip>
              </FlexContainer>
              <ImageList
                cols={isMobile ? 1 : 3}
                gap={isMobile ? 10 : 20}
                rowHeight={isMobile ? 200 : 425}
                sx={{ maxHeight: isMobile ? '600px' : '875px' }}
              >
                {images.map((image, index) => (
                  <Styles.StyledImageListItem
                    key={index}
                    selected={+selectedImages.includes(index)}
                    onClick={() => imageSelectionHandler(index)}
                  >
                    <Styles.StyledImage
                      src={getFileUrl(
                        process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                        `${details.id}/images/${image}`
                      )}
                      alt="restaurant-image"
                      fill
                      sizes="100vw"
                      selected={+selectedImages.includes(index)}
                    />
                    <ImageListItemBar
                      sx={{
                        backgroundColor: 'transparent',
                        zIndex: 10,
                      }}
                      position="top"
                      actionIcon={
                        +selectedImages.includes(index) && (
                          <IconButton>
                            <CheckCircleIcon color="secondary" fontSize="large" />
                          </IconButton>
                        )
                      }
                      actionPosition="right"
                    />
                  </Styles.StyledImageListItem>
                ))}
              </ImageList>
              <Styles.DeletePopper open={selectedImages.length}>
                <FlexContainer gap={1}>
                  <IconButton onClick={() => setSelectedImages([])} color="primary">
                    <Tooltip title="Reset Selected Images" placement="top" arrow>
                      <CloseIcon />
                    </Tooltip>
                  </IconButton>
                  <Text variant="sub">{selectedImages.length} Selected Images</Text>
                  <IconButton color="error" onClick={openDeleteModal}>
                    <Tooltip title="Delete Selected Images" placement="top" arrow>
                      <Delete />
                    </Tooltip>
                  </IconButton>
                </FlexContainer>
              </Styles.DeletePopper>
            </DashboardContent>
          </Grid>
        )}
      </DashboardContainer>
    </React.Fragment>
  );
};

export default RestaurantImages;
