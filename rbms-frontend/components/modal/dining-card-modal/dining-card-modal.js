import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Styles
import * as Styles from './dining-card-modal.styles';
import { FlexContainer, ModalCancelIcon, PrimaryButton, Text } from '@/components/UI';
import { Box, Dialog, DialogContent, DialogTitle, Rating } from '@mui/material';

// Icons
import CloseIcon from '@mui/icons-material/Close';

// Helpers
import { getDate, getTime } from '@/helpers/dateHelpers';
import { getFileUrl } from '@/helpers/fileHelpers';

const DiningCardModal = ({ plan, showModal, handleCloseModal }) => {
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
          View Dining Plan
        </Text>
      </DialogTitle>
      <DialogContent dividers={true}>
        <Styles.PlanDetails>
          <Styles.RestaurantImage>
            <Image
              src={
                (plan.restaurant.cover &&
                  getFileUrl(
                    process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                    `${plan.restaurant.id}/cover/${plan.restaurant.cover}`
                  )) ||
                '/assets/images/bg-placeholder.png'
              }
              alt="restaurant-cover"
              fill
              sizes="100%"
              style={{ borderRadius: '5px' }}
            />
          </Styles.RestaurantImage>

          <Box maxWidth="60%">
            <Text
              variant="main"
              color="secondary"
              sx={{ fontWeight: 900, display: 'block', mb: 3 }}
            >
              {plan.title}
            </Text>
            <Text
              variant="subHeader"
              color="text.secondary"
              sx={{ fontWeight: 500, display: 'block', mb: 1 }}
            >
              {plan.restaurant.name}
            </Text>
            <FlexContainer sx={{ justifyContent: 'left', gap: 1, mb: 3 }}>
              <Rating value={plan.restaurant.rating} size="small" readOnly />
              <Text variant="sub" color="text.ternary">
                {plan.restaurant.rating} ({plan.restaurant.count} Reviews)
              </Text>
            </FlexContainer>
            <Text variant="body" color="text.secondary" sx={{ display: 'block', mb: 3 }}>
              {plan.description}
            </Text>
            <Text
              variant="body"
              color="secondary"
              sx={{ display: 'block', fontWeight: 900 }}
            >
              <Text variant="body" color="text.secondary" mr={1}>
                Timing:
              </Text>
              {getDate(plan.date)} {getTime(plan.date)}
            </Text>
          </Box>
        </Styles.PlanDetails>
        <Link
          href={`/restaurant/${plan.restaurant.slug}`}
          style={{ position: 'absolute', right: 20, bottom: 15 }}
        >
          <PrimaryButton>
            <Text variant="sub" fontWeight={800}>
              View
            </Text>
          </PrimaryButton>
        </Link>
      </DialogContent>
    </Dialog>
  );
};

export default DiningCardModal;
