import React from 'react';
import { useRouter } from 'next/router';

import * as Styles from './logo.styles';

const Logo = ({
  color = 'primary',
  size = 'header',
  isNavigate = true,
  isHide = false,
}) => {
  const router = useRouter();

  const clickHandler = () => {
    if (!isNavigate) return;
    router.push('/');
  };

  return (
    <Styles.LogoContainer onClick={clickHandler} color={color}>
      <Styles.Logo variant={size} />
      <Styles.LogoText variant={size} hide={+isHide}>
        DineEase
      </Styles.LogoText>
    </Styles.LogoContainer>
  );
};

export default Logo;
