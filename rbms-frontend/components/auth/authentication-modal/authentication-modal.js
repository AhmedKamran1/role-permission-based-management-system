import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

// Styles
import * as Styles from './authentication-modal.styles';
import { Modal } from '@mui/material';
import { ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';

// Icons
import CloseIcon from '@mui/icons-material/Close';

const AuthenticationModal = ({ showModal, handleCloseModal }) => {
  const router = useRouter();

  const clickHandler = async () => {
    handleCloseModal();
    router.push('/signup');
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <Styles.ModalContainer>
        <ModalCancelIcon onClick={handleCloseModal}>
          <CloseIcon color="secondary" fontSize="medium" />
        </ModalCancelIcon>
        <Image src={'/assets/images/food.svg'} alt="food" height={200} width={300} />
        <Text variant="main" fontWeight={800}>
          Not Authenticated
        </Text>
        <Text variant="body" textAlign="center">
          Oops! You are not authenticated to perform this action.
        </Text>
        <PrimaryButton onClick={clickHandler}>
          <Text variant="body">Signup</Text>
        </PrimaryButton>
      </Styles.ModalContainer>
    </Modal>
  );
};

export default AuthenticationModal;
