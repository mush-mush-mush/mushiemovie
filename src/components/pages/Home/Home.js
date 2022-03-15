import React, { Component } from 'react';
import './home.scss';

import Carousel from './Carousel';
import PopularContent from './PopularContent';
import TopRatedContent from './TopRatedContent';
import UpcomingContent from './UpcomingContent';

class Home extends Component {
  render() {
    return (
      <>
        <Carousel />
        <PopularContent />
        <TopRatedContent />
        <UpcomingContent />
      </>
    );
  }
}

export default Home;
