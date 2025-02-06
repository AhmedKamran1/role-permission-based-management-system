import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './restaurant-card.styles';
import { FlexContainer, Text } from '@/components/UI';

import userImage from '@/public/assets/images/avatar.jpg';

const RestaurantCard = () => {
  return (
    <Styles.Card>
      <FlexContainer gap={5}>
        <FlexContainer
          sx={{
            flexDirection: 'column',
            gap: 1,
            textAlign: 'left',
            alignItems: 'flex-start',
          }}
        >
          <Text variant="main" fontWeight={800}>
            Kababjees Restaurant
          </Text>
          <Text variant="sub">3 (364 reviews)</Text>
          <Text variant="sub" color="text.ternary" mt={3}>
            Category:
          </Text>
          <Text variant="sub">BBQ, Fast Food, Sea Food</Text>
        </FlexContainer>
        <Image
          src={userImage}
          alt="restaurant-image"
          height={160}
          width={110}
          style={{ borderRadius: '15px' }}
        />
      </FlexContainer>
    </Styles.Card>
  );
};

export default RestaurantCard;
