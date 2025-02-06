import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './gallery.styles';
import { FlexContainer, SectionContainer, Text } from '@/components/UI';
import { Box, Grid, ImageList, ImageListItem, useMediaQuery } from '@mui/material';

// Icons
import LunchDiningIcon from '@mui/icons-material/LunchDining';
import LocalPizzaIcon from '@mui/icons-material/LocalPizza';
import SetMealIcon from '@mui/icons-material/SetMeal';

// Utils
import { categoryTypes } from '@/utils/constants';

const imageData = [
  {
    img: 'mix.jpg',
    title: 'Mix-Food',
    rows: 2,
    cols: 2,
  },
  {
    img: 'bbq.jpg',
    title: 'BBQ',
    rows: 1,
    cols: 2,
  },
  {
    img: 'burger.jpg',
    title: 'Burger',
    rows: 2,
    cols: 1,
  },
  {
    img: 'sea-food.jpg',
    title: 'Sea-Food',
    rows: 2,
    cols: 1,
  },

  {
    img: 'mexican.jpg',
    title: 'Mexican',
    rows: 2,
    cols: 2,
  },
  {
    img: 'pizza.jpg',
    title: 'Pizza',
    cols: 2,
  },
];

const Gallery = () => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));
  return (
    <SectionContainer container columnSpacing={!isMobile ? 10 : 0}>
      <Grid item xs={12} md={6}>
        <ImageList variant="quilted" cols={4} rowHeight={125} gap={isMobile ? 7 : 15}>
          {imageData.map((item) => (
            <ImageListItem key={item.img} cols={item.cols} rows={item.rows}>
              <Image
                src={`/assets/images/restaurant/${item.img}`}
                alt={item.title}
                fill
                sizes="100%"
                style={{ objectFit: 'cover', borderRadius: '10px' }}
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Grid>
      <Grid item xs={12} md={6}>
        <Styles.GalleryContent>
          <Text variant="header" color="primary" fontWeight={500}>
            Why Choose DineEase?
          </Text>
          <Text variant="bigHeader" fontWeight={800}>
            <Text variant="bigHeader" color="primary" fontWeight={800} mr={1}>
              Discover
            </Text>
            Uncountable types of categories available to satisfy your taste buds!
          </Text>
          <Text variant="subHeader">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque diam
            pellentesque bibendum non dui volutpat fringilla bibendum. Urna, elit augue
            urna, vitae feugiat pretium donec id elementum. Ultrices mattis sed vitae mus
            risus. Lacus nisi, et ac dapibus sit eu velit in consequat.
          </Text>
          <FlexContainer textAlign="center" gap={3} flexWrap="wrap">
            {categoryTypes.slice(0, 3).map((category, index) => (
              <Box key={category}>
                <Styles.Cuisine>
                  {index === 0 && (
                    <LunchDiningIcon sx={{ fontSize: '3rem', color: 'text.primary' }} />
                  )}
                  {index === 1 && (
                    <LocalPizzaIcon sx={{ fontSize: '3rem', color: 'text.primary' }} />
                  )}
                  {index === 2 && (
                    <SetMealIcon sx={{ fontSize: '3rem', color: 'text.primary' }} />
                  )}
                </Styles.Cuisine>
                <Text variant="main">{category}</Text>
              </Box>
            ))}
          </FlexContainer>
          <Styles.CuisineDetails>
            <Text variant="header" color="primary" fontWeight={800} mr={4}>
              {categoryTypes.length}+
            </Text>
            <Text variant="subHeader" fontWeight={500}>
              Types of categories
            </Text>
          </Styles.CuisineDetails>
        </Styles.GalleryContent>
      </Grid>
    </SectionContainer>
  );
};

export default Gallery;
