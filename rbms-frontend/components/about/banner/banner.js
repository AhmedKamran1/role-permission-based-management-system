import React from 'react';
import Image from 'next/image';

// Styles
import * as Styles from './banner.styles';
import { FlexContainer, Text } from '@/components/UI';

const Banner = () => {
  return (
    <React.Fragment>
      <Styles.BannerContainer>
        <FlexContainer sx={{ flexDirection: 'column', gap: 2, height: '100%' }}>
          <Text variant="subHeader" color="text.primary" fontWeight={500}>
            Uncountable Categories and Dining Locations
          </Text>
          <Text variant="bigHeader" color="text.primary" fontWeight={900}>
            Always Delivering Amazing Experiences
          </Text>
          <Text variant="main" color="text.primary" width="80%">
            Rooted in passion, we curate unforgettable dining experiences and offer
            exceptional services, blending culinary artistry with warm hospitality.
          </Text>
        </FlexContainer>
        <Styles.WavesContainer>
          <Image
            src="/assets/images/about/waves.png"
            alt="banner-waves"
            sizes="100%"
            fill
            style={{ mixBlendMode: 'color-dodge' }}
          />
        </Styles.WavesContainer>
      </Styles.BannerContainer>
    </React.Fragment>
  );
};

export default Banner;
