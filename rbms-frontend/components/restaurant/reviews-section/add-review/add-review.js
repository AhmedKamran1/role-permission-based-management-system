import React, { useCallback, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { selectUserState } from '@/store/user/userSlice';

// Styles
import * as Styles from './add-review.styles';
import { FlexContainer, InputField, PrimaryButton, Text } from '@/components/UI';
import { Avatar, Box, Input, Rating } from '@mui/material';

// Icons
import ImageIcon from '@mui/icons-material/Image';

// Helpers
import { getFileUrl, validateImage } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Utils
import { reviewSchema } from '@/utils/validation-schema/review';
import { allowedImageTypes } from '@/utils/constants';

// Components
import AddReviewImages from './add-review-images';

const AddReview = ({
  addReviewHandler,
  review = null,
  isModal = false,
  updateHandler,
}) => {
  const user = useSelector(selectUserState);
  const [previewImages, setPreviewImages] = useState(review?.images || []);
  const deletedImages = useRef([]);

  const memoizedPreviewImages = useMemo(() => previewImages, [previewImages]);

  const imageChangeHandler = (event) => {
    try {
      const newImages = event.target.files;
      if (previewImages.length + newImages.length > 10) {
        throw new Error('Maximum 10 images allowed');
      }
      for (const file of newImages) validateImage(file);
      setPreviewImages((prevImages) => [...prevImages, ...newImages]);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  const deleteImageHandler = useCallback((index, image) => {
    setPreviewImages((prevImages) => {
      prevImages.splice(index, 1);
      return prevImages.slice();
    });
    if (isModal && typeof image === 'string') {
      deletedImages.current.push(image);
    }
  }, []);

  const submitHandler = async (values) => {
    formik.setSubmitting(true);

    values.content = values.content.trim();

    const formData = new FormData();
    for (const key in values) {
      formData.append(key, values[key]);
    }

    previewImages.forEach((image) => {
      formData.append('files', image);
    });

    if (isModal) {
      deletedImages.current.forEach((image) => {
        formData.append('deletedImages[]', image);
      });
      await updateHandler(formData);
    } else {
      await addReviewHandler(formData);
    }

    formik.setSubmitting(false);
    formik.resetForm();
    setPreviewImages([]);
  };

  const formik = useFormik({
    initialValues: {
      content: review?.content || '',
      rating: review?.rating || null,
    },
    validationSchema: reviewSchema,
    onSubmit: submitHandler,
  });

  if (!user.id) {
    return;
  }

  return (
    <Box component="form" onSubmit={formik.handleSubmit}>
      <FlexContainer sx={{ justifyContent: 'space-between', mb: 2 }}>
        {!isModal && (
          <FlexContainer gap={1.5}>
            <Avatar
              alt="User Avatar"
              src={
                user.avatar &&
                getFileUrl(
                  process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                  `${user.id}/avatar/${user.avatar}`
                )
              }
              sx={{ height: 72, width: 72, border: '1px solid rgba(0, 0, 0, 0.2)' }}
            >
              {!user.avatar && user.name?.slice(0, 1)}
            </Avatar>
            <Text variant="main" fontWeight={500}>
              {user.name}
            </Text>
          </FlexContainer>
        )}
        <Box m={isModal && 'auto'}>
          <Rating
            name="rating"
            value={formik.values.rating}
            onChange={(e, newValue) => {
              formik.setFieldValue('rating', newValue);
            }}
            onBlur={formik.handleBlur}
            size="large"
          />
          {formik.errors.rating && Boolean(formik.touched.rating) && (
            <Text variant="sub" color="error" sx={{ display: 'block' }}>
              {formik.errors.rating}
            </Text>
          )}
        </Box>
      </FlexContainer>
      <InputField
        name="content"
        label="Comment Your Dining Experience."
        variant="outlined"
        placeholder="Enter Review"
        value={formik.values.content}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.errors.content && Boolean(formik.touched.content)}
        helperText={formik.touched.content && formik.errors.content}
        multiline
        minRows={isModal ? 4 : 6}
        maxRows={isModal ? 4 : 6}
      />
      <Styles.ImageContainer>
        <AddReviewImages
          previewImages={memoizedPreviewImages}
          isModal={isModal}
          deleteImageHandler={deleteImageHandler}
          review={review}
        />
        <Styles.ImagePlaceHolder
          component="label"
          onChange={imageChangeHandler}
          modal={+isModal}
        >
          <ImageIcon color="primary" fontSize="large" />
          <Text variant="body" fontWeight={500} color="text.secondary">
            Attach Image.
          </Text>
          <Input
            type="file"
            inputProps={{ multiple: true, accept: allowedImageTypes.join(', ') }}
            sx={{ display: 'none' }}
          />
        </Styles.ImagePlaceHolder>
      </Styles.ImageContainer>
      <FlexContainer mt={2}>
        <PrimaryButton type="submit" disabled={formik.isSubmitting}>
          <Text variant="body">{isModal ? 'Update' : 'Post Review'}</Text>
        </PrimaryButton>
      </FlexContainer>
    </Box>
  );
};

export default AddReview;
