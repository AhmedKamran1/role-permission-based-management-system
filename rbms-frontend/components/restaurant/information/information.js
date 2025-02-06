import React from 'react';

// Styles
import * as Styles from './information.styles';
import { FlexContainer, SectionContainer, Text } from '@/components/UI';
import { Divider, Grid, useMediaQuery } from '@mui/material';

// Icons
import LunchDiningIcon from '@mui/icons-material/LunchDining';

const Information = ({ restaurant }) => {
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('md'));

  return (
    <SectionContainer container sx={{ mb: 0, mt: 0, position: 'relative', top: -50 }}>
      <Grid item xs={10} md={8}>
        <Styles.InformationContent>
          <FlexContainer sx={{ flexDirection: 'column', gap: 1 }}>
            <Styles.IconContainer>
              <LunchDiningIcon sx={{ color: 'text.primary' }} />
            </Styles.IconContainer>
            <Text variant="body" fontWeight={800}>
              {restaurant.categories.join(', ')}
            </Text>
            <Text variant="sub" fontWeight={500}>
              Categories we offer
            </Text>
          </FlexContainer>
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            flexItem
            sx={{ backgroundColor: 'grey' }}
          />
          <FlexContainer sx={{ flexDirection: 'column', gap: 1 }}>
            <Styles.IconContainer>
              <LunchDiningIcon sx={{ color: 'text.primary' }} />
            </Styles.IconContainer>
            <Text variant="body" fontWeight={800}>
              {restaurant.address}
            </Text>
            <Text variant="sub" fontWeight={500}>
              Our Location
            </Text>
          </FlexContainer>
          <Divider
            orientation={isMobile ? 'horizontal' : 'vertical'}
            flexItem
            sx={{ backgroundColor: 'grey' }}
          />
          <FlexContainer sx={{ flexDirection: 'column', gap: 1 }}>
            <Styles.IconContainer>
              <LunchDiningIcon sx={{ color: 'text.primary' }} />
            </Styles.IconContainer>
            <Text variant="body" fontWeight={800}>
              {restaurant.isVerified ? `+${restaurant.phoneNumber}` : 'No Number'}
            </Text>
            <Text variant="sub" fontWeight={500}>
              Contact Us
            </Text>
          </FlexContainer>
        </Styles.InformationContent>
      </Grid>
    </SectionContainer>
  );
};

export default Information;
