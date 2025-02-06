import React, { useEffect, useState } from 'react';
import { useRestaurantContext } from '@/context/restaurant';

// Components
import MenuItems from './menu-items/menu-items';

// Styles
import { Grid, Accordion, AccordionSummary, IconButton, Box } from '@mui/material';
import { DashboardContainer, DashboardContent, Text } from '@/components/UI';

// Icons
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Utils
import { MenuCategory } from '@/utils/constants';

// Helpers
import { fetchCurrency } from '@/helpers/mapHelpers';
import { getError } from '@/helpers/snackbarHelpers';

const Menu = () => {
  const [open, setOpen] = useState(Object.keys(MenuCategory)[0]);
  const [currencyType, setCurrencyType] = useState('');

  const { details } = useRestaurantContext();

  const handleChange = (panel) => (event, isExpanded) => {
    setOpen(isExpanded ? panel : false);
  };

  const getCurrencyType = async () => {
    try {
      const currency = await fetchCurrency(details.location.country);
      setCurrencyType(currency);
    } catch (e) {
      console.log(getError(e));
    }
  };

  useEffect(() => {
    getCurrencyType();
  }, []);

  return (
    <DashboardContainer container columnSpacing={2} rowGap={1}>
      <Grid item xs={12}>
        <DashboardContent>
          <Box mb={3}>
            <Text variant="subHeader" fontWeight={500}>
              Restaurant Menu
            </Text>
          </Box>
          {Object.entries(MenuCategory).map(([key, value]) => (
            <Accordion key={key} expanded={open === key} onChange={handleChange(key)}>
              <AccordionSummary
                expandIcon={
                  <IconButton>
                    <ExpandMoreIcon />
                  </IconButton>
                }
              >
                <Text variant="subHeader" color="text.secondary" fontWeight={500}>
                  {value.text}
                </Text>
              </AccordionSummary>
              <MenuItems
                key={key}
                category={value.category}
                currencyType={currencyType}
              />
            </Accordion>
          ))}
        </DashboardContent>
      </Grid>
    </DashboardContainer>
  );
};

export default Menu;
