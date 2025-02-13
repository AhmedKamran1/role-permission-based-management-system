import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

// Styles
import { Button, Modal, Checkbox, FormControlLabel } from '@mui/material';
import { FlexContainer, ModalContainer, Text } from '@/components/UI';

// Icons
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { PERMISSIONS } from '@/utils/permissions';

const ModeratorPermissionsModal = ({
  showModal,
  handleCloseModal,
  selectedUserPermissions,
}) => {
  const [loading, setLoading] = useState(false);
  const [moderatorPermissions, setModeratorPermissions] = useState({
    manageModerators: selectedUserPermissions.includes(PERMISSIONS.MANAGE_MODERATOR),
    viewAdmins: selectedUserPermissions.includes(PERMISSIONS.VIEW_ADMINS),
  });

  const onSaveHandler = async () => {
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

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setModeratorPermissions((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <Modal open={showModal} onClose={handleCloseModal}>
      <ModalContainer>
        <WorkspacePremiumIcon color="info" sx={{ fontSize: '5rem' }} />
        <Text variant="main" fontWeight={800} mb={2}>
          Update Permissions
        </Text>
        <FormControlLabel
          control={
            <Checkbox
              name="manageModerators"
              checked={moderatorPermissions.manageModerators}
              onChange={handleChange}
            />
          }
          label="Manage Moderators Permission"
        />
        <FormControlLabel
          control={
            <Checkbox
              name="viewAdmins"
              checked={moderatorPermissions.viewAdmins}
              onChange={handleChange}
            />
          }
          label="View Admins Permission"
        />
        <FlexContainer gap={2} mt={2}>
          <Button variant="outlined" onClick={handleCloseModal} disabled={loading}>
            <Text variant="body">Cancel</Text>
          </Button>
          <Button variant="contained" onClick={onSaveHandler} disabled={loading}>
            <Text variant="body" color="text.primary">
              Save
            </Text>
          </Button>
        </FlexContainer>
      </ModalContainer>
    </Modal>
  );
};

export default ModeratorPermissionsModal;
