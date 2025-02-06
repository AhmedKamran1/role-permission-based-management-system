import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Styles
import * as Styles from './review-modal.styles';
import { ModalCancelIcon, Text } from '@/components/UI';
import {
  Avatar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  ImageList,
  ImageListItem,
  Rating,
  useMediaQuery,
} from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Helpers
import { getDate, getTimePassed } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

// Components
import VoteOptions from '@/components/reviews/vote-options/vote';

const ReviewModal = ({ review, showModal, handleCloseModal, viewOnly, hide = false }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  const {
    name = null,
    id: userId,
    avatar = null,
    slug = null,
  } = (review && review.userId) || {};
  const {
    name: restaurantName,
    id: restaurantId,
    cover = null,
    slug: restaurantSlug,
  } = (review && review.restaurantId) || {};
  const {
    rating = null,
    createdAt = null,
    id: reviewId,
    images = [],
    votes = [],
    content = null,
  } = review || {};

  const renderImages = (restaurantId, reviewId, images) => {
    const imageCount = Math.min(images.length, 3);
    const layout = [
      { rows: 2, cols: images.length === 1 ? 2 : 1 },
      { rows: images.length === 2 ? 2 : 1, cols: 1 },
      {
        rows: 1,
        cols: 1,
        overlayText: images.length - 3,
        overlay: images.length === 3 ? false : true,
      },
    ];

    return layout.slice(0, imageCount).map((layout, index) => (
      <ImageListItem key={index} rows={layout.rows} cols={layout.cols}>
        <Image
          src={
            images.length &&
            getFileUrl(
              process.env.NEXT_PUBLIC_AWS_S3_REVIEWS_BUCKET,
              `${restaurantId}/${reviewId}/${images[index]}`
            )
          }
          alt="review-image"
          fill
          sizes="100%"
          style={{ objectFit: 'cover' }}
        />
        {layout.overlay && (
          <Styles.ImageCountOverlay>
            <Text variant="main" color="text.primary">
              +{layout.overlayText}
            </Text>
          </Styles.ImageCountOverlay>
        )}
      </ImageListItem>
    ));
  };

  return (
    <Dialog
      open={showModal}
      onClose={handleCloseModal}
      scroll="paper"
      fullWidth={true}
      maxWidth="md"
    >
      <ModalCancelIcon onClick={handleCloseModal}>
        <CloseIcon color="secondary" fontSize="medium" />
      </ModalCancelIcon>
      <DialogTitle>
        <Text variant="subHeader" color="text.secondary">
          View Review
        </Text>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Styles.ReviewCard>
          {!hide && (
            <Styles.Details>
              <Link href={`/restaurant/${restaurantSlug}`}>
                <Avatar
                  src={
                    (cover &&
                      getFileUrl(
                        process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                        `${restaurantId}/cover/${cover}`
                      )) ||
                    '/assets/images/bg-placeholder.png'
                  }
                  sx={{ width: 72, height: 72 }}
                >
                  {restaurantName?.slice(0, 1)}
                </Avatar>
              </Link>
              <Box>
                <Link href={`/restaurant/${restaurantSlug}`}>
                  <Text
                    variant="main"
                    fontWeight={500}
                    sx={{ display: 'block', color: 'text.secondary' }}
                  >
                    {restaurantName}
                  </Text>
                </Link>
              </Box>
            </Styles.Details>
          )}
          {!hide && (
            <Divider orientation="horizontal" variant="middle" sx={{ mt: 2, mb: 2 }} />
          )}
          <Styles.Details>
            <Link href={`/profile/${slug}`}>
              <Avatar
                src={
                  avatar &&
                  getFileUrl(
                    process.env.NEXT_PUBLIC_AWS_S3_USERS_BUCKET,
                    `${userId}/avatar/${avatar}`
                  )
                }
                sx={{ width: 72, height: 72 }}
              >
                {name?.slice(0, 1)}
              </Avatar>
            </Link>
            <Box>
              <Link href={`/profile/${slug}`}>
                <Text
                  variant="main"
                  fontWeight={500}
                  sx={{ display: 'block', color: 'text.secondary' }}
                >
                  {name}
                </Text>
              </Link>
              <Rating value={rating} precision={0.5} readOnly sx={{ mt: 0.25 }} />
              <Text variant="sub" sx={{ display: 'block', color: 'text.secondary' }}>
                {getDate(createdAt)}, {getTimePassed(createdAt)}
              </Text>
            </Box>
          </Styles.Details>
          <Text variant="body" sx={{ display: 'block', mt: 2, color: 'text.secondary' }}>
            {content}
          </Text>
          {images.length > 0 && (
            <Box sx={{ width: '100%', mt: 3 }}>
              <ImageList rowHeight={isMobile ? 150 : 200} cols={2} variant="quilted">
                {renderImages(restaurantId || review.restaurantId, reviewId, images)}
              </ImageList>
            </Box>
          )}
          <VoteOptions
            reviewId={reviewId}
            reviewVotes={votes}
            reviewUserId={userId}
            viewOnly={viewOnly}
          />
        </Styles.ReviewCard>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewModal;
