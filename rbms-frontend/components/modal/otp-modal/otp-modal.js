import React, { useEffect, useState } from 'react';

import { useRestaurantContext } from '@/context/restaurant';

// Services
import { verifyOTP, generateOTP } from '@/services';

// Styles
import * as Styles from './otp-modal.styles';
import { enqueueSnackbar } from 'notistack';

// Styles
import { Box, Modal } from '@mui/material';
import { FlexContainer, ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Icons
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import CloseIcon from '@mui/icons-material/Close';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getOtpTimer } from '@/helpers/dateHelpers';

const OtpModal = ({ showModal, handleCloseModal, restaurantId, phoneNumber }) => {
  const { detailsHandler } = useRestaurantContext();

  const [otp, setOtp] = useState('');
  const [ttl, setTtl] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (newValue) => {
    setOtp(newValue);
  };

  const sendOTPVerification = async () => {
    try {
      const { data } = await generateOTP(restaurantId);
      setTtl(data.ttl);
    } catch (e) {
      handleCloseModal();
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  const verifyHandler = async () => {
    try {
      setIsLoading(true);
      if (otp.toString().length !== 6) throw Error('OTP must be 6 digits');
      await verifyOTP(restaurantId, { otp });
      detailsHandler({ isVerified: true });
      handleCloseModal();
      enqueueSnackbar({ variant: 'success', message: 'OTP Verified' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setOtp('');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    sendOTPVerification();
  }, []);

  useEffect(() => {
    let intervalId;

    if (ttl > 0) {
      intervalId = setInterval(() => {
        setTtl((prevTtl) => (prevTtl > 0 ? prevTtl - 1 : 0));
      }, 1000);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [ttl]);

  return (
    <Modal open={showModal}>
      <Styles.ModalContainer>
        <ModalCancelIcon onClick={handleCloseModal}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <MobileFriendlyIcon sx={{ fontSize: '5rem' }} color="primary" />
        <Text variant="main" fontWeight={800}>
          Verify OTP
        </Text>
        <Text variant="body" textAlign="center">
          An OTP has been sent to mobile number&nbsp;
          <Text variant="body" fontWeight={500}>
            +{phoneNumber}
          </Text>
        </Text>
        <Styles.StyledOtp
          value={otp}
          onChange={handleChange}
          gap={1}
          length={6}
          autoFocus
        />
        {ttl > 0 && (
          <Box>
            <Box>
              <Text variant="main">OTP will expire in</Text>
            </Box>
            <FlexContainer>
              <Text variant="subHeader" fontWeight={600}>
                {getOtpTimer(ttl)}
              </Text>
            </FlexContainer>
          </Box>
        )}

        <PrimaryButton disabled={isLoading}>
          {ttl === 0 ? (
            <Text variant="body" onClick={sendOTPVerification}>
              Resend OTP
            </Text>
          ) : (
            <Text variant="body" onClick={verifyHandler}>
              Verify
            </Text>
          )}
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default OtpModal;
