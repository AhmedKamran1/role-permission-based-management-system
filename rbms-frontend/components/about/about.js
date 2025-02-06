import React from 'react';

// Components
import Banner from './banner/banner';
import Details from './details/details';
import Services from './services/services';
import MoreDetails from './more-details/more-details';

const About = () => {
  return (
    <React.Fragment>
      <Banner />
      <Details />
      <Services />
      <MoreDetails />
    </React.Fragment>
  );
};

export default About;
