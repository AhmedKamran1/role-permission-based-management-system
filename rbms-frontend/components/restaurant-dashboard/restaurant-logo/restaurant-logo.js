import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Services
import { uploadRestaurantCover } from '@/services';

// Styles
import * as Styles from './restaurant-logo.styles';
import { FlexContainer, Text } from '@/components/UI';
import { Avatar, Box, Divider, IconButton, Input, Rating, Tooltip } from '@mui/material';

// Icons
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

// Utils
import { allowedImageTypes } from '@/utils/constants';

// Helpers
import { getFileUrl, validateImage } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';

const RestaurantLogo = ({ open }) => {
  const { details, detailsHandler } = useRestaurantContext();

  const [newAvatar, setNewAvatar] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatarChange = (event) => {
    try {
      const file = event.target.files[0];
      validateImage(file);
      setNewAvatar(file);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: e.message });
    }
  };

  const handleCancelAvatar = () => {
    setNewAvatar(null);
  };

  const handleConfirmAvatar = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('file', newAvatar);

      const response = await uploadRestaurantCover(details.id, formData);
      detailsHandler({ cover: response.data });
      handleCancelAvatar();

      enqueueSnackbar({ variant: 'success', message: 'Cover Updated' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Styles.RestaurantDetails open={open}>
      <Box position="relative">
        <Avatar
          alt="restaurant-avatar"
          src={
            (newAvatar && URL.createObjectURL(newAvatar)) ||
            (details.cover &&
              getFileUrl(
                process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                `${details.id}/cover/${details.cover}`
              )) ||
            '/assets/images/bg-placeholder.png'
          }
          sx={{ height: 120, width: 120 }}
        />
        {!newAvatar ? (
          <Styles.AvatarButton component="label" onChange={handleAvatarChange}>
            <CameraAltIcon sx={{ color: 'white' }} fontSize="small" />
            <Input
              type="file"
              inputProps={{
                accept: allowedImageTypes.join(', '),
              }}
              sx={{ display: 'none' }}
            />
          </Styles.AvatarButton>
        ) : (
          !isSubmitting && (
            <Styles.AvatarConfirmation>
              <Tooltip title="Save Changes" placement="top" arrow>
                <IconButton onClick={handleConfirmAvatar} disabled={!newAvatar}>
                  <CheckCircleIcon color="success" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Cancel Changes" placement="top" arrow>
                <IconButton onClick={handleCancelAvatar} disabled={!newAvatar}>
                  <CancelIcon color="error" />
                </IconButton>
              </Tooltip>
            </Styles.AvatarConfirmation>
          )
        )}
      </Box>
      <Text variant="subHeader" fontWeight={500}>
        {details.name}
      </Text>
      <FlexContainer gap={1}>
        <Rating value={details.rating} readOnly precision={0.5} />
        <Text variant="body" color="text.ternary">
          ({details.count} Reviews)
        </Text>
      </FlexContainer>
      <Divider variant="middle" flexItem sx={{ mt: 1, mb: 0.5 }} />
    </Styles.RestaurantDetails>
  );
};

export default RestaurantLogo;
