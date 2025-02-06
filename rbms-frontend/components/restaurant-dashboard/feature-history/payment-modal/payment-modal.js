import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import * as Styles from './payment-modal.styles';
import { Box, Modal } from '@mui/material';
import { FlexContainer, ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Stripe
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Services
import { createIntent, createSubscription } from '@/services';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

const PaymentModal = ({
  showModal,
  handleClosePaymentModal,
  handleClosePlansModal,
  selectedPlan,
  fetchRestaurantPayments,
}) => {
  const { details } = useRestaurantContext();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    if (elements == null) {
      setIsSubmitting(false);
      return;
    }

    // Validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      enqueueSnackbar({ variant: 'error', message: submitError.message });
      setIsSubmitting(false);
      return;
    }

    // payload
    let clientSecret;
    const payload = { planId: selectedPlan.id, restaurantId: details.id };

    // retrieve clientSecret
    try {
      const response = await createIntent(payload);
      clientSecret = response.data;
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
      setIsSubmitting(false);
      return;
    }

    // create payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `https://google.com/`,
      },
      redirect: 'if_required',
    });

    if (error) {
      enqueueSnackbar({ variant: 'error', message: error.message });
      setIsSubmitting(false);
      return;
    }

    // create subscription
    try {
      const response = await createSubscription({
        ...payload,
        stripeId: paymentIntent.id,
      });
      enqueueSnackbar({ variant: 'success', message: response.data });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }

    setIsSubmitting(false);
    handleClosePaymentModal();
    handleClosePlansModal();
    fetchRestaurantPayments();
  };

  return (
    <Modal open={showModal} onClose={handleClosePaymentModal}>
      <Styles.ModalContainer>
        <ModalCancelIcon onClick={handleClosePaymentModal}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Text variant="subHeader" fontWeight={500}>
            Payment Details
          </Text>
        </Box>
        <FlexContainer
          component="form"
          sx={{ flexDirection: 'column' }}
          onSubmit={handleSubmit}
        >
          <PaymentElement />
          <PrimaryButton
            type="submit"
            disabled={!stripe || !elements || isSubmitting}
            sx={{ mt: 2 }}
          >
            <Text variant="body">Pay</Text>
          </PrimaryButton>
        </FlexContainer>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default PaymentModal;
