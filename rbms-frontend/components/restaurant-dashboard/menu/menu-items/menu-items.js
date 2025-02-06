import React, { useEffect, useState } from 'react';
import { enqueueSnackbar } from 'notistack';
import { ReactSortable } from 'react-sortablejs';

import { useRestaurantContext } from '@/context/restaurant';

// Components
import ItemModal from '../item-modal/item-modal';

// Services
import { updateMenuOrder } from '@/services';

// Styles
import * as Styles from './menu-items.styles';
import { PrimaryButton, Text } from '@/components/UI';
import { AccordionActions, AccordionDetails, Box, Button } from '@mui/material';

// Icons
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuCard from '../menu-card/menu-card';

// Helpers
import { getError } from '@/helpers/snackbarHelpers';

const CardWrapper = React.forwardRef((props, ref) => {
  return (
    <Box ref={ref} display="flex" flexWrap="wrap" gap={2}>
      {props.children}
    </Box>
  );
});
CardWrapper.displayName = 'CardWrapper';

const MenuItems = ({ category, currencyType }) => {
  const { details, detailsHandler } = useRestaurantContext();

  const [menu, setMenu] = useState([]);
  const [showItemModal, setShowItemModal] = useState(false);
  const [sorting, setSorting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const filteredMenu = details.menu
      .filter((v) => v.category === category)
      .sort((a, b) => a.order - b.order);

    setMenu(filteredMenu);
  }, [details.menu, category]);

  const handleSort = (event) => {
    setSorting(true);

    const { oldIndex, newIndex } = event;

    const detailsMenuCopy = JSON.parse(JSON.stringify(menu));

    const draggedItemContent = detailsMenuCopy.splice(oldIndex, 1)[0];
    detailsMenuCopy.splice(newIndex, 0, draggedItemContent);

    detailsMenuCopy.forEach((item, index) => {
      item.order = index;
    });

    // Update menu state
    setMenu(detailsMenuCopy);
  };

  const confirmSort = async () => {
    try {
      setIsLoading(true);
      const orders = menu.map((v) => ({ id: v.id, value: v.order }));
      const { data } = await updateMenuOrder(details.id, { orders });
      detailsHandler({ menu: data });
      enqueueSnackbar({ variant: 'success', message: 'Menu Order Updated' });
    } catch (e) {
      enqueueSnackbar({ variant: 'error', message: getError(e) });
    } finally {
      setIsLoading(false);
      setSorting(false);
    }
  };

  const cancelSort = () => {
    setMenu(
      details.menu
        .filter((v) => v.category === category)
        .sort((a, b) => a.order - b.order)
    );
    setSorting(false);
  };

  return (
    <React.Fragment>
      {showItemModal && (
        <ItemModal
          showModal={showItemModal}
          setShowModal={setShowItemModal}
          headerTitle="Add Item"
          itemDetails={{ category, order: menu.length }}
          currencyType={currencyType}
        />
      )}
      <AccordionDetails>
        <Styles.MenuItemsContainer>
          <ReactSortable
            onEnd={handleSort}
            tag={CardWrapper}
            list={menu}
            setList={setMenu}
            animation={200}
            delayOnTouchStart={true}
            delay={2}
          >
            {menu.map((item) => (
              <MenuCard key={item.id} item={item} currencyType={currencyType} />
            ))}
          </ReactSortable>
          <Styles.AddItemPlaceholder onClick={() => setShowItemModal(true)}>
            <AddCircleOutlineIcon color="secondary" fontSize="large" />
            <Text variant="subHeader" color="secondary">
              Add Item
            </Text>
          </Styles.AddItemPlaceholder>
        </Styles.MenuItemsContainer>
      </AccordionDetails>
      {sorting && (
        <AccordionActions>
          <PrimaryButton disabled={isLoading} onClick={confirmSort}>
            Save
          </PrimaryButton>
          {!isLoading && (
            <Button variant="outlined" color="error" onClick={cancelSort}>
              Cancel
            </Button>
          )}
        </AccordionActions>
      )}
    </React.Fragment>
  );
};

export default MenuItems;
