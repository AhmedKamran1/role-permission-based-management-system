import React from 'react';

// Components
import Information from './information/information';
import Categories from './categories/categories';
import Map from './map/map';
import RestaurantReviews from './reviews-section/reviews/reviews';
import Banner from './banner/banner';

const Restaurant = ({ restaurant }) => {
  return (
    <React.Fragment>
      <Banner restaurant={restaurant} />
      <Information restaurant={restaurant} />
      <Map restaurant={restaurant} />
      <Categories restaurant={restaurant} />
      <RestaurantReviews restaurant={restaurant} />
    </React.Fragment>
  );
};

export default Restaurant;
