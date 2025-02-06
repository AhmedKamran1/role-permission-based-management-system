import React, { useState } from 'react';
import Image from 'next/image';
import { enqueueSnackbar } from 'notistack';

import { useRestaurantContext } from '@/context/restaurant';

// Services
import { deleteMenuItem } from '@/services';

// Styles
import * as Styles from './menu-card.styles';
import { Box, Card, CardMedia, IconButton, Tooltip } from '@mui/material';
import { FlexContainer, Text } from '@/components/UI';

// Icons
import Delete from '@mui/icons-material/Delete';
import Edit from '@mui/icons-material/Edit';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

// Components
import DeleteModal from '@/components/modal/delete-modal/delete-modal';
import ItemModal from '../item-modal/item-modal';

// Helpers
import { getFileUrl } from '@/helpers/fileHelpers';

const MenuCard = ({ item, currencyType }) => {
  const { name, description, price, image, order } = item;

  const { details, detailsHandler } = useRestaurantContext();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showItemModal, setShowItemModal] = useState(false);

  const numberFormat = new Intl.NumberFormat();

  const handleDelete = async () => {
    const { data } = await deleteMenuItem(details.id, item.id);
    detailsHandler({ menu: data });
    setShowDeleteModal(false);
    enqueueSnackbar({ variant: 'success', message: 'Menu Item Deleted' });
  };

  return (
    <React.Fragment>
      {showItemModal && (
        <ItemModal
          showModal={showItemModal}
          setShowModal={setShowItemModal}
          itemDetails={item}
          headerTitle="Update Item"
          currencyType={currencyType}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          showModal={showDeleteModal}
          handleCloseModal={() => setShowDeleteModal(false)}
          deleteHandler={handleDelete}
        />
      )}
      <Card sx={{ width: '220px', height: '300px', cursor: 'grab' }}>
        <CardMedia sx={{ height: '150px', position: 'relative' }}>
          <Image
            src={getFileUrl(
              process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
              `${details.id}/menu/${image}`
            )}
            alt="menu-item"
            sizes="100%"
            fill
            style={{ objectFit: 'cover' }}
          />
        </CardMedia>
        <Styles.CardContentContainer>
          <FlexContainer sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Text variant="body" color="text.secondary" fontWeight={800}>
              {name}
            </Text>
            <Tooltip title="Draggable Card" placement="top" arrow>
              <IconButton>
                <DragIndicatorIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </FlexContainer>
          <Text
            variant="sub"
            color="text.ternary"
            sx={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              maxWidth: '100%',
            }}
          >
            {description}
          </Text>
          <FlexContainer sx={{ justifyContent: 'space-between', width: '100%' }}>
            <Text variant="body" fontWeight={500} color="text.secondary">
              US${numberFormat.format(price)}
            </Text>
            <Box>
              <Tooltip title="Edit Details" placement="top" arrow>
                <IconButton onClick={() => setShowItemModal(true)}>
                  <Edit fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Item" placement="top" arrow>
                <IconButton onClick={() => setShowDeleteModal(true)}>
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </FlexContainer>
        </Styles.CardContentContainer>
      </Card>
    </React.Fragment>
  );
};

export default MenuCard;
