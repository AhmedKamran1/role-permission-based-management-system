import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './services.styles';
import { CardMedia, Grid } from '@mui/material';
import { PaddedButton, Text } from '@/components/UI';

const Services = () => {
  const services = [
    {
      title: 'Dining Plans',
      description:
        'Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship Lorem ipsum dolor sit amet',
      image: '/assets/images/scene1.svg',
    },
    {
      title: 'Favorite Maps',
      description:
        'Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship Lorem ipsum dolor sit amet',
      image: '/assets/images/scene10.svg',
    },
    {
      title: 'Cuisine Details',
      description:
        'Where Each Plate Weaves a Story of Culinary Mastery and Passionate Craftsmanship Lorem ipsum dolor sit amet',
      image: '/assets/images/scene5.svg',
    },
  ];

  return (
    <Styles.ServicesContainer>
      <Text variant="subHeader" color="text.primary" sx={{ display: 'block', mb: 1 }}>
        Services We Provide
      </Text>
      <Text
        variant="bigHeader"
        color="text.primary"
        fontWeight={900}
        sx={{ display: 'block' }}
      >
        What we can do for you
      </Text>
      <Grid
        container
        columnSpacing={5}
        rowSpacing={3}
        sx={{ justifyContent: 'center', position: 'relative', top: 100 }}
      >
        {services.map((service, index) => (
          <Grid item xs={12} sm={4} lg={3} key={index}>
            <Styles.StyledCard>
              <CardMedia sx={{ height: '250px', position: 'relative' }}>
                <Image
                  src={service.image}
                  alt="service"
                  sizes="100%"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </CardMedia>
              <Styles.CardContentContainer>
                <PaddedButton sx={{ mb: 6 }}>
                  <Text variant="body" fontWeight={800}>
                    {service.title}
                  </Text>
                </PaddedButton>
                <Text variant="body" color="text.secondary" lineHeight={1.5}>
                  {service.description}
                </Text>
              </Styles.CardContentContainer>
            </Styles.StyledCard>
          </Grid>
        ))}
      </Grid>
    </Styles.ServicesContainer>
  );
};

export default Services;
