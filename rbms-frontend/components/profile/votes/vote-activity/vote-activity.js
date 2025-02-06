import React, { useEffect, useRef, useState } from 'react';
import { useProfileContext } from '@/context/profile';

// Styles
import * as Styles from './vote-activity.styles';
import { Avatar, Divider } from '@mui/material';
import { FlexContainer, Text } from '../../../UI';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Services
import { getReviewBySlug, getUserVotes } from '@/services/review';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';
import { getDate } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Icons
import PollIcon from '@mui/icons-material/Poll';
import ReviewModal from '@/components/restaurant-dashboard/reviews/review-modal/review-modal';

const VotesActivity = () => {
  const [showModal, setShowModal] = useState(false);
  const [votes, setVotes] = useState([]);
  const { details } = useProfileContext();
  const reviewDetails = useRef(null);

  const fetchUserVotes = async () => {
    try {
      const response = await getUserVotes(details.id);
      setVotes(response.data);
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
  };

  useEffect(() => {
    if (details?.id) fetchUserVotes();
  }, [details?.id]);

  const openModalHandler = async (review) => {
    try {
      const response = await getReviewBySlug(review.slug);
      reviewDetails.current = response.data;
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    }
    setShowModal(true);
  };

  if (!votes.length) {
    return (
      <FlexContainer mt={10} gap={2}>
        <PollIcon fontSize="large" color="primary" />
        <Text variant="subHeader">Currently No Votes</Text>
      </FlexContainer>
    );
  }

  return (
    <React.Fragment>
      {showModal && (
        <ReviewModal
          showModal={showModal}
          handleCloseModal={() => setShowModal(false)}
          review={reviewDetails.current}
          viewOnly={true}
        />
      )}
      {votes.map((vote) => (
        <React.Fragment key={vote.id}>
          <Styles.VoteActivity gap={2} onClick={() => openModalHandler(vote.reviewId)}>
            <Avatar
              alt="User Avatar"
              src={
                details.avatar &&
                getFileUrl(
                  process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                  `${details.id}/avatar/${details.avatar}`
                )
              }
              sx={{
                height: 65,
                width: 65,
              }}
            >
              {!details.avatar && details.firstName.slice(0, 1)}
            </Avatar>
            <FlexContainer
              sx={{
                flexDirection: 'column',
                alignItems: 'flex-start',
              }}
            >
              <Text variant="body">
                <Text variant="body" fontWeight={500}>
                  {details.name}
                </Text>{' '}
                reacted{' '}
                <Text variant="body" fontWeight={500}>
                  {vote.type}
                </Text>{' '}
                to{' '}
                <Text variant="body" fontWeight={500}>
                  {vote.reviewId.userId.name}
                </Text>
                's review
              </Text>
              <Text variant="sub" mt={1}>
                {getDate(vote.createdAt)}
              </Text>
            </FlexContainer>
          </Styles.VoteActivity>
          <Divider orientation="horizontal" variant="middle" sx={{ mt: 1, mb: 1 }} />
        </React.Fragment>
      ))}
    </React.Fragment>
  );
};

export default VotesActivity;
