import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectUserState, userActions } from '@/store/user/userSlice';
import { useProfileContext } from '@/context/profile';

// Components
import EditProfileMenu from './menu/menu';
import DetailsModal from './details-modal/details-modal';

// Services
import { updateProfileImage } from '@/services';

// Styles
import * as Styles from './about.styles';
import { Avatar, Badge, IconButton, Tooltip } from '@mui/material';
import { Text } from '@/components/UI';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Helpers
import { getDate } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';
import { getError } from '@/helpers/snackbarHelpers';
import { getBadge } from '@/helpers/badgeHelpers';
import { getBadgeTitle } from '@/helpers/badgeHelpers';

// Icons
import InfoIcon from '@mui/icons-material/InfoOutlined';
import TodayIcon from '@mui/icons-material/Today';
import LocationIcon from '@mui/icons-material/LocationOn';
import MailIcon from '@mui/icons-material/Mail';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const About = () => {
  const dispatch = useDispatch();

  const user = useSelector(selectUserState);
  const { details, detailsHandler } = useProfileContext();

  const [newAvatar, setNewAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAvatar = (image) => {
    setNewAvatar(image);
  };

  const handleConfirmAvatar = async () => {
    try {
      setIsSubmitting(true);

      const formData = new FormData();
      formData.append('type', 'avatar');
      formData.append('file', newAvatar);

      const response = await updateProfileImage(formData);
      const updated = { avatar: response.data };

      dispatch(userActions.updateDetails(updated));
      detailsHandler(updated);
      handleCancelAvatar();

      enqueueSnackbar({ variant: 'success', message: 'Avatar Updated' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAvatar = () => {
    setNewAvatar(null);
  };

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <React.Fragment>
      {showModal && <DetailsModal showModal={showModal} closeModal={closeModal} />}
      <Styles.AboutContainer>
        <Styles.ProfileAvatarContainer>
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            badgeContent={
              getBadge(details.createdAt) && (
                <Tooltip
                  title={getBadgeTitle(details.createdAt)}
                  placement="bottom"
                  arrow
                >
                  {getBadge(details.createdAt, 'large')}
                </Tooltip>
              )
            }
            sx={{ width: '100%', height: '100%' }}
          >
            <Avatar
              alt="User Avatar"
              src={
                (newAvatar && URL.createObjectURL(newAvatar)) ||
                (details.avatar &&
                  getFileUrl(
                    process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                    `${details.id}/avatar/${details.avatar}`
                  ))
              }
              sx={{
                height: '100%',
                width: '100%',
                border: '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              {!details.avatar && details.firstName.slice(0, 1)}
            </Avatar>
          </Badge>
          {newAvatar && !isSubmitting && (
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
          )}
        </Styles.ProfileAvatarContainer>
        {details.id === user.id && (
          <EditProfileMenu handleAvatar={handleAvatar} openModal={openModal} />
        )}
        <Styles.Details>
          <Text variant="main" fontWeight={500}>
            {details.firstName} {details.lastName}
          </Text>
          <Styles.IconContainer>
            <MailIcon color="primary" fontSize="small" />
            <Text variant="body">{details.email}</Text>
          </Styles.IconContainer>

          {details.location?.country && (
            <Styles.IconContainer>
              <LocationIcon color="primary" fontSize="small" />
              <Text variant="body">{details.location.country}</Text>
            </Styles.IconContainer>
          )}
          <Styles.IconContainer>
            <TodayIcon color="primary" fontSize="small" />
            <Text variant="body">{getDate(details.createdAt)}</Text>
          </Styles.IconContainer>
          {details.description && (
            <React.Fragment>
              <Styles.IconContainer>
                <InfoIcon color="primary" fontSize="small" />
                <Text variant="body" fontWeight={500}>
                  About
                </Text>
              </Styles.IconContainer>
              <Text variant="body" sx={{ textAlign: 'left', display: 'block' }}>
                {details.description}
              </Text>
            </React.Fragment>
          )}
        </Styles.Details>
      </Styles.AboutContainer>
    </React.Fragment>
  );
};

export default About;
