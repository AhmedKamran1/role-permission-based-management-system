import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import { Button, Modal } from '@mui/material';
import * as Styles from './delete-modal.styles';
import { FlexContainer, Text } from '@/components/UI';

// Icons
import Delete from '@mui/icons-material/Delete';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

const DeleteModal = ({ showModal, handleCloseModal, deleteHandler }) => {
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    try {
      setLoading(true);
      await deleteHandler();
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setLoading(false);
      handleCloseModal();
    }
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Styles.ModalContainer>
        <Delete sx={{ fontSize: '6rem' }} color="error" />
        <Text variant="main" fontWeight={800}>
          Delete Confirmation
        </Text>
        <Text variant="body" textAlign="center">
          Are you sure you want to perform this delete action?
        </Text>
        <FlexContainer gap={2}>
          <Button variant="outlined" onClick={handleCloseModal} disabled={loading}>
            <Text variant="body">Cancel</Text>
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={clickHandler}
            disabled={loading}
          >
            <Text variant="body" color="text.primary">
              Confirm
            </Text>
          </Button>
        </FlexContainer>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default DeleteModal;
