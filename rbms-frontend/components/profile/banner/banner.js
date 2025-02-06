import React, { useState } from 'react';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';
import { useProfileContext } from '@/context/profile';

// Services
import { updateProfileImage } from '@/services';

// Styles
import * as Styles from './banner.styles';
import { Button } from '@mui/material';
import { PrimaryButton, Text } from '@/components/UI';
import { BannerContainer } from './banner.styles';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';

const Banner = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { details, detailsHandler } = useProfileContext();
  const { cover, newCover } = details;

  const handleConfirmBanner = async () => {
    try {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('type', 'cover');
      formData.append('file', newCover);

      const response = await updateProfileImage(formData);
      detailsHandler({ cover: response.data, newCover: null });

      enqueueSnackbar({ variant: 'success', message: 'Cover Updated' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelBanner = () => {
    detailsHandler({ newCover: null });
  };

  return (
    <BannerContainer>
      <Image
        src={
          (newCover && URL.createObjectURL(newCover)) ||
          (cover &&
            getFileUrl(
              process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
              `${details.id}/cover/${cover}`
            )) ||
          '/assets/images/bg-placeholder.png'
        }
        fill={true}
        objectFit="cover"
        alt="User Cover"
      />
      {newCover && !isSubmitting && (
        <Styles.ButtonsContainer>
          <React.Fragment>
            <PrimaryButton sx={{ mr: 1 }} onClick={handleConfirmBanner}>
              <Text variant="body">Save</Text>
            </PrimaryButton>
            <Button variant="contained" color="error" onClick={handleCancelBanner}>
              <Text variant="body" color="text.primary">
                Cancel
              </Text>
            </Button>
          </React.Fragment>
        </Styles.ButtonsContainer>
      )}
    </BannerContainer>
  );
};

export default Banner;
