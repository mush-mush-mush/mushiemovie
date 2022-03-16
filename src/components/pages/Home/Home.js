import React, { Component } from 'react';
import Helmet from 'react-helmet';
import './home.scss';

import Carousel from './Carousel';
import PopularContent from './PopularContent';
import TopRatedContent from './TopRatedContent';
import UpcomingContent from './UpcomingContent';

class Home extends Component {
  render() {
    return (
      <>
        <Helmet>
          <title>Mushie Movie</title>
        </Helmet>
        <Carousel />
        <PopularContent />
        <TopRatedContent />
        <UpcomingContent />
      </>
    );
  }
}

export default Home;
