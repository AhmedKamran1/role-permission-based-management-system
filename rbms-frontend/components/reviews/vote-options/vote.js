import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserState } from '@/store/user/userSlice';

// Styles
import * as Styles from './vote.styles';
import { Tooltip } from '@mui/material';

// Icons
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDownAlt';
import LaughIcon from '@mui/icons-material/SentimentVerySatisfied';
import UsefulIcon from '@mui/icons-material/Lightbulb';
import CoolIcon from '@mui/icons-material/AutoAwesome';

// Utils
import { VoteTypes } from '@/utils/constants';
import { addVote, deleteVote, updateVote } from '@/services/review';

// Snackbar
import { enqueueSnackbar } from 'notistack';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

// Components
import AuthenticationModal from '@/components/auth/authentication-modal/authentication-modal';

const VoteOptions = ({ reviewId, reviewVotes, reviewUserId, viewOnly = false }) => {
  const user = useSelector(selectUserState);
  const [votes, setVotes] = useState(reviewVotes);
  const [userVote, setUserVote] = useState(
    reviewVotes.filter((vote) => vote.userId === user.id)[0]?.type || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [showAuthModal, setShowAuthModal] = useState(false);

  const voteCounts = votes.reduce((acc, vote) => {
    if (acc[vote.type]) {
      acc[vote.type]++;
    } else {
      acc[vote.type] = 1;
    }
    return acc;
  }, {});

  const options = [
    { icon: <ThumbUpIcon />, value: VoteTypes.LIKE, count: voteCounts?.like || 0 },
    {
      icon: <ThumbDownIcon />,
      value: VoteTypes.DISLIKE,
      count: voteCounts?.dislike || 0,
    },
    { icon: <LaughIcon />, value: VoteTypes.FUNNY, count: voteCounts?.funny || 0 },
    { icon: <CoolIcon />, value: VoteTypes.COOL, count: voteCounts?.cool || 0 },
    { icon: <UsefulIcon />, value: VoteTypes.USEFUL, count: voteCounts?.useful || 0 },
  ];

  const handleVote = async (voteType) => {
    if (!user.id) {
      setShowAuthModal(true);
      return;
    }

    if (viewOnly) {
      return;
    }

    if (reviewUserId === user.id) {
      enqueueSnackbar({ variant: 'error', message: "Cannot vote on your own review." });
      return;
    }

    const updatedVotes = [...votes];
    const updateIndex = updatedVotes.findIndex((vote) => vote.userId === user.id);

    try {
      setIsSubmitting(true);
      if (updateIndex !== -1) {
        const sameVoteType = updatedVotes[updateIndex].type === voteType;

        if (!sameVoteType) {
          updateVote(updatedVotes[updateIndex].id, {
            type: voteType,
          });
          updatedVotes[updateIndex].type = voteType;
          setUserVote(voteType);
        } else {
          await deleteVote(updatedVotes[updateIndex].id);
          updatedVotes.splice(updateIndex, 1);
          setUserVote(null);
        }
      } else {
        const response = await addVote(reviewId, { type: voteType });
        updatedVotes.push(response.data);
        setUserVote(voteType);
      }
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setVotes(updatedVotes);
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      {showAuthModal && (
        <AuthenticationModal
          showModal={showAuthModal}
          handleCloseModal={() => setShowAuthModal(false)}
        />
      )}
      <Styles.Container>
        {options.map((item) => (
          <Tooltip key={item.value} title={item.value} placement="top" arrow>
            <Styles.VoteButton
              startIcon={item.icon}
              value={item.value}
              onClick={() => handleVote(item.value)}
              selected={item.value === userVote}
              disabled={isSubmitting}
              sx={{ borderRadius: 5 }}
            >
              {item.count}
            </Styles.VoteButton>
          </Tooltip>
        ))}
      </Styles.Container>
    </React.Fragment>
  );
};

export default VoteOptions;
