import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './menu.styles';
import { FlexContainer, Text } from '@/components/UI';
import { Grid, Tab, Tabs } from '@mui/material';

// Utils
import { MenuCategory } from '@/utils/constants';
import { getFileUrl } from '@/helpers/fileHelpers';

const Menu = ({ value, handleChange, items = [], restaurant, currencyType }) => {
  const numberFormat = new Intl.NumberFormat();

  return (
    <Grid container>
      <Grid item xs={12}>
        <Styles.Header>
          <Text variant="subHeader" color="primary" fontWeight={500}>
            Choose & Pick
          </Text>
          <Text variant="header" fontWeight={800}>
            Browse Menu
          </Text>
        </Styles.Header>
      </Grid>
      <Grid item xs={12} mb={5}>
        <Tabs
          variant="fullWidth"
          value={value}
          onChange={(event, newValue) => handleChange(newValue)}
          centered
          scrollButtons="auto"
        >
          {Object.entries(MenuCategory).map(([key, value]) => (
            <Tab
              key={key}
              value={value.category}
              label={<Text variant="body">{value.text}</Text>}
              sx={{ textTransform: 'none' }}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid item xs={0} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
        <Image
          src={'/assets/images/restaurant/menu-image.png'}
          alt="menu-image"
          height={500}
          width={500}
        />
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container columnSpacing={4} rowSpacing={4}>
          {items.map((item) => (
            <Grid item xs={12} md={6} key={item.name}>
              <Styles.Card>
                <FlexContainer sx={{ justifyContent: 'flex-start', gap: 2 }}>
                  <Image
                    src={
                      (item.image &&
                        getFileUrl(
                          process.env.NEXT_PUBLIC_AWS_S3_RESTAURANTS_BUCKET,
                          `${restaurant.id}/menu/${item.image}`
                        )) ||
                      '/assets/images/bg-placeholder.png'
                    }
                    alt={item.name}
                    height={100}
                    width={125}
                    style={{ borderRadius: '10px' }}
                  />
                  <FlexContainer
                    sx={{ flexDirection: 'column', gap: 1, alignItems: 'flex-start' }}
                  >
                    <Text variant="main" fontWeight={800}>
                      {item.name}
                    </Text>
                    <Text variant="body">{item.description}</Text>
                    <Text variant="main" color="primary" fontWeight={800}>
                      US${numberFormat.format(item.price)}
                    </Text>
                  </FlexContainer>
                </FlexContainer>
              </Styles.Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Menu;
