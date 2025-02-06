import React from 'react';

// Styles
import * as Styles from './card.styles';
import { Grid, useMediaQuery } from '@mui/material';
import { Text } from '@/components/UI';

// Icons
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SetMealIcon from '@mui/icons-material/SetMeal';
import IcecreamIcon from '@mui/icons-material/Icecream';

const cards = [
  {
    icon: <LunchDiningIcon sx={{ fontSize: '3rem' }} color="primary" />,
    service: 'Dining',
    details: 'Delight your guests with our flavors and presentation',
  },
  {
    icon: <LocalPizzaIcon sx={{ fontSize: '3rem' }} color="primary" />,
    service: 'Catering',
    details: 'Delight your guests with our flavors and presentation',
  },
  {
    icon: <SetMealIcon sx={{ fontSize: '3rem' }} color="primary" />,
    service: 'Planning',
    details: 'Delight your guests with our flavors and presentation',
  },
  {
    icon: <IcecreamIcon sx={{ fontSize: '3rem' }} color="primary" />,
    service: 'Personalizing',
    details: 'Delight your guests with our flavors and presentation',
  },
];

const Card = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <Grid
      container
      columnSpacing={4}
      rowSpacing={isMobile ? 2 : 4}
      justifyContent={isMobile && 'center'}
    >
      {cards.map((card) => (
        <Grid item xs={8} md={5} key={card.service}>
          <Styles.Card>
            {card.icon}
            <Text variant="subHeader" color="primary" fontWeight={500}>
              {card.service}
            </Text>
            <Text variant="body">{card.details}</Text>
          </Styles.Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default Card;
