import React, { useRef, useState } from 'react';
import { useRestaurantContext } from '@/context/restaurant';

// Styles
import * as Styles from './recent-reviews.styles';
import { DashboardContent, FlexContainer, Text } from '@/components/UI';
import { Avatar, Box, Divider, Grid, Pagination, Rating } from '@mui/material';

// Icons
import ReviewIcon from '@mui/icons-material/Reviews';

// Helpers
import { getDate } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Components
import ReviewModal from '../../reviews/review-modal/review-modal';

const RecentReviews = ({ reviews }) => {
  const { details } = useRestaurantContext();
  const [showReviewModal, setShowReviewModal] = useState(false);
  const reviewDetails = useRef(null);

  const openModalHandler = (review) => {
    reviewDetails.current = { ...review, name: review.userId.name };
    setShowReviewModal(true);
  };

  const closeModalHandler = () => {
    setShowReviewModal(false);
  };

  const [page, setPage] = useState(1);
  const reviewLimit = useRef(4);

  const totalPage = Math.ceil(reviews.length / reviewLimit.current);

  const pageHandler = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <React.Fragment>
      {showReviewModal && (
        <ReviewModal
          showModal={showReviewModal}
          handleCloseModal={closeModalHandler}
          review={reviewDetails.current}
          viewOnly={true}
          hide={true}
        />
      )}
      <Grid container columnSpacing={1}>
        <Grid item xs={12}>
          <Styles.Header variant="subHeader">Recent Reviews</Styles.Header>
        </Grid>
        {reviews
          .slice((page - 1) * reviewLimit.current, page * reviewLimit.current)
          .map((review) => (
            <Grid item xs={12} sm={6} md={3} key={review.id}>
              <DashboardContent>
                <Styles.Details>
                  <Avatar
                    alt="User Avatar"
                    src={
                      review.userId.avatar &&
                      getFileUrl(
                        process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                        `${review.userId.id}/avatar/${review.userId.avatar}`
                      )
                    }
                    sx={{
                      height: 60,
                      width: 60,
                    }}
                  >
                    {review.userId.name.slice(0, 1)}
                  </Avatar>
                  <Box>
                    <Styles.Name variant="body">{review.userId.name}</Styles.Name>
                    <Rating value={review.rating} size="small" readOnly />
                    <Text variant="sub" color="text.ternary" sx={{ display: 'block' }}>
                      Posted on {getDate(review.createdAt)}
                    </Text>
                  </Box>
                </Styles.Details>
                <Text variant="body" sx={{ display: 'block', mt: 2 }}>
                  {review.content.slice(0, 350)}
                  <Text
                    variant="body"
                    sx={{ textDecoration: 'underline', color: 'blue', cursor: 'pointer' }}
                    onClick={() => openModalHandler(review)}
                  >
                    {review.content.length > 200 && '...See More'}
                  </Text>
                </Text>
              </DashboardContent>
            </Grid>
          ))}
      </Grid>
      {reviews.length ? (
        <FlexContainer>
          <Pagination
            color="primary"
            count={totalPage}
            variant="outlined"
            shape="rounded"
            sx={{
              mt: 2.5,
              '& .MuiPaginationItem-root:not(.Mui-selected)': {
                color: 'text.secondary',
              },
            }}
            page={page}
            onChange={pageHandler}
          />
        </FlexContainer>
      ) : (
        <FlexContainer mt={5} gap={2}>
          <ReviewIcon fontSize="large" color="primary" />
          <Text variant="subHeader">Currently No Reviews</Text>
        </FlexContainer>
      )}
    </React.Fragment>
  );
};

export default RecentReviews;
