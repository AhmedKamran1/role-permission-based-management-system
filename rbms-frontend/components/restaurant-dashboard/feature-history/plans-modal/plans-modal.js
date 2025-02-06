import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import { Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@mui/material';
import { ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Services
import { getActivePlans } from '@/services';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Components
import PlansCard from './plans-card/plans-card';
import PaymentModal from '../payment-modal/payment-modal';

const PlansModal = ({ showModal, handleCloseModal, fetchRestaurantPayments }) => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [openPaymentForm, setOpenPaymentForm] = useState(false);

  const fetchPlans = async () => {
    try {
      const response = await getActivePlans();
      setPlans(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const planSelectionHandler = (planType) => {
    setSelectedPlan(planType);
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      scroll="paper"
      fullWidth={true}
      maxWidth="md"
    >
      <ModalCancelIcon onClick={handleCloseModal}>
        <CloseIcon color="secondary" fontSize="medium" />
      </ModalCancelIcon>
      <DialogTitle>
        <Text variant="subHeader" color="text.secondary" fontWeight={800} mb={1.5}>
          Available Plans
        </Text>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Grid container columnSpacing={1} rowGap={1}>
          {plans.map((plan) => (
            <Grid item xs={12} sm={6} md={4} key={plan.id}>
              <PlansCard
                item={plan}
                selectedPlan={selectedPlan}
                planSelectionHandler={planSelectionHandler}
              />
            </Grid>
          ))}
        </Grid>
        <PaymentModal
          showModal={openPaymentForm}
          handleClosePaymentModal={() => setOpenPaymentForm(false)}
          handleClosePlansModal={handleCloseModal}
          selectedPlan={selectedPlan}
          fetchRestaurantPayments={fetchRestaurantPayments}
        />
      </DialogContent>
      <DialogActions>
        <PrimaryButton disabled={!selectedPlan}>
          <Text variant="body" onClick={() => setOpenPaymentForm(true)}>
            Next
          </Text>
        </PrimaryButton>
      </DialogActions>
    </Dialog>
  );
};

export default PlansModal;
