import React from 'react';

// Components
import Banner from './banner/banner';
import Gallery from './gallery/gallery';
import Services from './services/services';
import About from './about/about';
import RestaurantCard from './map/restaurant-card/restaurant-card';

const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      {/* <RestaurantCard/> */}
      <Gallery />
      <About />
      <Services />
    </React.Fragment>
  );
};

export default Home;
