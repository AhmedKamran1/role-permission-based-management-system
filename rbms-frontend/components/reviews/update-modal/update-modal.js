import React from 'react';

// Styles
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { ModalCancelIcon, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Components
import AddReview from '@/components/restaurant/reviews-section/add-review/add-review';

const ReviewUpdateModal = ({ review, showModal, handleCloseModal, updateHandler }) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      scroll="paper"
      fullWidth={true}
      maxWidth="sm"
    >
      <ModalCancelIcon onClick={handleCloseModal}>
        <CloseIcon color="secondary" fontSize="medium" />
      </ModalCancelIcon>
      <DialogTitle>
        <Text variant="subHeader" color="text.secondary">
          Update Review
        </Text>
      </DialogTitle>
      <DialogContent dividers={true}>
        <AddReview isModal={true} review={review} updateHandler={updateHandler} />
      </DialogContent>
    </Dialog>
  );
};

export default ReviewUpdateModal;
