import React, { useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useProfileContext } from '@/context/profile';

// Styles
import { MenuItem, Fade, InputLabel, Input, IconButton } from '@mui/material';
import { EditContainer } from './menu.styles';
import { ArrowMenu, Text } from '@/components/UI';

// Icons
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

// Helpers
import { validateImage } from '@/helpers/fileHelpers';

// Utils
import { allowedImageTypes } from '@/utils/constants';

const EditProfileMenu = ({ handleAvatar, openModal }) => {
  const { detailsHandler } = useProfileContext();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const openMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleBannerImage = (event) => {
    try {
      const file = event.target.files[0];
      validateImage(file);
      detailsHandler({ newCover: file });
      closeMenu();
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: e.message });
    }
  };

  const handleAvatarChange = (event) => {
    try {
      const file = event.target.files[0];
      validateImage(file);
      handleAvatar(file);
      closeMenu();
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: e.message });
    }
  };

  return (
    <React.Fragment>
      <EditContainer
        onClick={openMenu}
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <IconButton>
          <SettingsIcon color="primary" fontSize="medium" />
        </IconButton>
      </EditContainer>
      <ArrowMenu
        id="profile-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
        }}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            openModal();
            closeMenu();
          }}
        >
          <EditIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
          <Text variant="sub" color="text.secondary">
            Edit Information
          </Text>
        </MenuItem>
        <InputLabel htmlFor="user-avatar">
          <MenuItem>
            <CameraAltIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Text variant="sub" color="text.secondary">
              Change Avatar
            </Text>
          </MenuItem>
          <Input
            id="user-avatar"
            type="file"
            sx={{ display: 'none' }}
            inputProps={{ accept: allowedImageTypes.join(', ') }}
            onChange={handleAvatarChange}
          />
        </InputLabel>
        <InputLabel htmlFor="user-cover">
          <MenuItem>
            <CameraAltIcon color="primary" fontSize="small" sx={{ mr: 1 }} />
            <Text variant="sub" color="text.secondary">
              Change Cover
            </Text>
          </MenuItem>
          <Input
            id="user-cover"
            type="file"
            sx={{ display: 'none' }}
            inputProps={{ accept: allowedImageTypes.join(', ') }}
            onChange={handleBannerImage}
          />
        </InputLabel>
      </ArrowMenu>
    </React.Fragment>
  );
};

export default EditProfileMenu;
