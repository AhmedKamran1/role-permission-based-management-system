import React, { useEffect, useState } from 'react';
import Link from 'next/link';

// Styles
import * as Styles from './banner.styles';
import { FlexContainer, PaddedButton, Text } from '@/components/UI';

const Banner = () => {
  const banner = [
    {
      text: 'Discover, Dine, Decide – With DineEase, Your Citys Culinary Compass.',
      img: 'mix.jpg',
    },
    { text: 'Your Guide to Local Gems.', img: 'bbq.jpg' },
    { text: 'Satisfy Your Cravings, Rate Your Raves.', img: 'mexican.jpg' },
    {
      text: 'From Hidden Cafés to Bustling Bars: Review Your Way Through the Best.',
      img: 'sea-food.jpg',
    },
  ];

  const [currentImage, setCurrentImage] = useState(0);
  const [progress, setProgress] = useState(new Array(banner.length).fill(0));

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (currentImage === banner.length - 1) {
        setCurrentImage(0);
        setProgress(new Array(banner.length).fill(0));
      } else {
        setCurrentImage((prev) => prev + 1);
      }
    }, 4000);

    setProgress((prevProgress) => {
      const newProgress = [...prevProgress];
      newProgress[currentImage] = 100;
      return newProgress;
    });
    return () => clearTimeout(timeout);
  }, [currentImage]);

  return (
    <Styles.BannerContainer>
      <Styles.StyledImage
        fill
        sizes="100%"
        alt="banner"
        src={`/assets/images/restaurant/${banner[currentImage].img}`}
        key={currentImage}
      />
      <Styles.BannerTextContainer>
        <Styles.Header key={currentImage}>
          <Text variant="bigHeader">{banner[currentImage].text}</Text>
        </Styles.Header>
        <Link href={'/search'}>
          <PaddedButton sx={{ mt: 3, mb: 2 }}>
            <Text variant="main">Explore Restaurants</Text>
          </PaddedButton>
        </Link>
        <FlexContainer gap={1}>
          {banner.map((banner, index) => (
            <Styles.ProgressContainer key={index}>
              <Styles.Progress
                sx={{
                  width: `${progress[index]}%`,
                }}
              />
            </Styles.ProgressContainer>
          ))}
        </FlexContainer>
      </Styles.BannerTextContainer>
    </Styles.BannerContainer>
  );
};

export default Banner;
