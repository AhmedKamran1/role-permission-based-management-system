import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { selectUserState } from '@/store/user/userSlice';
import { useNotificationContext } from '@/context/notifications';

// Styles
import * as Styles from './menu.styles';
import { ArrowMenu, FlexContainer, Text } from '@/components/UI';
import { Avatar, Badge, Box, Divider, Fade, IconButton, MenuItem } from '@mui/material';

// Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getTimePassed } from '@/helpers/dateHelpers';

// Services
import { getNotifications, readNotifications } from '@/services/notifications';
import { getReviewBySlug } from '@/services/review';
import { getPlanBySlug } from '@/services/dining-plan';

// Utils
import { NotificationRedirect } from '@/utils/notification-redirect';

// Components
import ReviewModal from '@/components/restaurant-dashboard/reviews/review-modal/review-modal';
import DiningCardModal from '@/components/modal/dining-card-modal/dining-card-modal';

const NotificationMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [readTimeout, setReadTimeout] = useState(null);
  const [unReadNotifications, setUnReadNotifications] = useState(new Set());
  const [showReview, setShowReview] = useState(false);
  const [showPlan, setShowPlan] = useState(false);
  const [review, setReview] = useState(null);
  const [plan, setPlan] = useState(null);

  const router = useRouter();

  const user = useSelector(selectUserState);
  const { socket } = useNotificationContext();

  const open = Boolean(anchorEl);

  const notificationHandler = async (item) => {
    if (item.type === 'dining-plan')
      try {
        const response = await getPlanBySlug(item.slug);
        setPlan(response.data);
      } catch (e) {
        enqueueSnackbar({ variant: 'error', message: getError(e) });
      }
    else if (item.type === 'vote') {
      try {
        const response = await getReviewBySlug(item.slug);
        setReview(response.data);
      } catch (e) {
        enqueueSnackbar({ variant: 'error', message: getError(e) });
      }
    } else if (
      item.type === 'restaurant-deleted' ||
      item.type === 'restaurant-rejected'
    ) {
      return;
    } else {
      router.push(`${NotificationRedirect[item.type]}/${item.slug}/logs`);
    }
    closeMenu();
  };

  useEffect(() => {
    if (review) {
      setShowReview(true);
    }
  }, [review]);

  useEffect(() => {
    if (plan) {
      setShowPlan(true);
    }
  }, [plan]);

  // socket connection
  useEffect(() => {
    if (user.id) socket.connect();
    // eslint-disable-next-line
  }, [user.id]);

  // update notification
  useEffect(() => {
    const createNotification = (data) => {
      setUnReadNotifications((prev) => new Set(prev.add(data.id)));
      setNotifications((prev) => [data, ...prev]);
    };

    socket.on('notification-created', createNotification);
    return () => {
      socket.off('notification-created', createNotification);
    };
  }, [socket]);

  // update notification
  useEffect(() => {
    const updateNotification = (data) => {
      const newIds = new Set();

      setNotifications((prev) => {
        const filtered = prev.filter((v) => {
          if (v.uid === data.uid) newIds.add(v.id);
          return v.uid !== data.uid;
        });
        return [data, ...filtered];
      });

      setUnReadNotifications((prev) => {
        const updatedSet = new Set(prev);
        newIds.forEach((id) => updatedSet.add(id));
        return updatedSet;
      });
    };

    socket.on('notification-updated', updateNotification);
    return () => {
      socket.off('notification-updated', updateNotification);
    };
  }, [socket]);

  // delete notification
  useEffect(() => {
    const deleteNotification = (data) => {
      const deleteIds = new Set();

      setNotifications((prev) => {
        const filtered = prev.filter((v) => {
          if (v.uid === data.uid) deleteIds.add(v.id);
          return v.uid !== data.uid;
        });
        return filtered;
      });

      setUnReadNotifications((prev) => {
        const updatedSet = new Set(prev);
        deleteIds.forEach((id) => updatedSet.delete(id));
        return updatedSet;
      });
    };

    socket.on('notification-deleted', deleteNotification);
    return () => {
      socket.off('notification-deleted', deleteNotification);
    };
  }, [socket]);

  // notifications initialization
  useEffect(() => {
    (async () => {
      try {
        const unRead = new Set();
        const response = await getNotifications(user.id);

        response.data.map((notification) => {
          if (!notification.isRead) {
            unRead.add(notification.id);
          }
        });

        setUnReadNotifications(unRead);
        setNotifications(response.data);
      } catch (e) {
        enqueueSnackbar({ variant: 'error', message: getError(e) });
      }
    })();
  }, [user.id]);

  const openMenu = async (e) => {
    let timeout;
    setAnchorEl(e.currentTarget);

    if (unReadNotifications.size > 0) {
      timeout = setTimeout(async () => {
        await readNotifications({ ids: Array.from(unReadNotifications) });
        setUnReadNotifications(new Set());
      }, 1000);
    }

    setReadTimeout(timeout);
  };

  const closeMenu = () => {
    clearTimeout(readTimeout);
    setReadTimeout(null);
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {showPlan && (
        <DiningCardModal
          showModal={showPlan}
          handleCloseModal={() => setShowPlan(false)}
          plan={plan}
        />
      )}
      {showReview && (
        <ReviewModal
          showModal={showReview}
          handleCloseModal={() => setShowReview(false)}
          review={review}
          viewOnly={true}
        />
      )}
      <IconButton onClick={openMenu}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          sx={{ cursor: 'pointer' }}
          badgeContent={
            unReadNotifications.size > 0 && (
              <Styles.Badge>
                <Text variant="sub" color="text.primary">
                  {unReadNotifications.size}
                </Text>
              </Styles.Badge>
            )
          }
        >
          <NotificationsIcon color="primary" sx={{ fontSize: '1.75rem' }} />
        </Badge>
      </IconButton>
      <ArrowMenu
        disableScrollLock={true}
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            maxHeight: { xs: '450px', md: '550px' },
            maxWidth: { xs: '300px', md: '400px' },
          },
        }}
        TransitionComponent={Fade}
      >
        <Box sx={{ textAlign: 'center', mb: 2, mt: 1 }}>
          <Text variant="main" color="text.secondary" fontWeight={500}>
            Notifications
          </Text>
        </Box>
        <Divider variant="middle" orientation="horizontal" sx={{ mb: 1 }} />
        {notifications.length > 0 ? (
          <Box sx={{ maxHeight: '375px', overflow: 'auto' }}>
            {notifications.map((item) => (
              <Box onClick={() => notificationHandler(item)} key={item.id}>
                <MenuItem sx={{ whiteSpace: 'normal' }}>
                  <FlexContainer gap={2} sx={{ justifyContent: 'left' }}>
                    {item.category === 'system' ? (
                      <InfoIcon color="info" sx={{ height: 60, width: 60 }} />
                    ) : (
                      <Avatar
                        src={item.image && item.image.src}
                        alt="notification"
                        sx={{ height: 60, width: 60 }}
                      />
                    )}

                    <Styles.NotificationContainer
                      isunread={+unReadNotifications.has(item.id)}
                    >
                      <Text variant="body" color="text.secondary">
                        {item.content}
                      </Text>
                      <Text variant="sub" color="text.secondary">
                        {getTimePassed(item.updatedAt)}
                      </Text>
                    </Styles.NotificationContainer>
                  </FlexContainer>
                </MenuItem>
                <Divider variant="middle" orientation="horizontal" />
              </Box>
            ))}
          </Box>
        ) : (
          <FlexContainer gap={1.5} p={2}>
            <NotificationsActiveIcon fontSize="large" color="primary" />
            <Text variant="main" color="text.secondary" fontWeight={500}>
              Currently No Notifications
            </Text>
          </FlexContainer>
        )}
      </ArrowMenu>
    </React.Fragment>
  );
};

export default NotificationMenu;
