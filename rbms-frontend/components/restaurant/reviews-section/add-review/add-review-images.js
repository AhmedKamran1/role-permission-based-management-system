import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './add-review.styles';

// Icons
import Delete from '@mui/icons-material/Delete';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';

const AddReviewImages = ({ previewImages, isModal, deleteImageHandler, review }) => {
  return previewImages.map((image, index) => (
    <Styles.Image key={index} modal={+isModal}>
      <Image
        src={
          typeof image === 'string'
            ? getFileUrl(
                process.env.NEXT_PUBLIC_AWS_S3_REVIEWS_BUCKET,
                `${review.restaurantId.id || review.restaurantId}/${review.id}/${image}`
              )
            : URL.createObjectURL(image)
        }
        alt="preview-image"
        fill
        sizes="100%"
        style={{ objectFit: 'cover', borderRadius: '5px' }}
      />

      <Styles.ImageDeleteIcon
        disableRipple
        sx={{ backgroundColor: 'red' }}
        color="inherit"
        onClick={() => deleteImageHandler(index, image)}
      >
        <Delete fontSize="small" sx={{ color: 'text.primary' }} />
      </Styles.ImageDeleteIcon>
    </Styles.Image>
  ));
};

export default React.memo(AddReviewImages);
