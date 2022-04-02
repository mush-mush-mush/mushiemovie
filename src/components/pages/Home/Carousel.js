import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Loading from '../../Loading/Loading';

import './carousel.scss';
import LazyImage from '../../LazyImage/LazyImage';
import { fetchTrendingMovies } from '../../../actions/movieActions';

class Carousel extends Component {
  state = {
    activeCarouselItem: 0,
    carouselInterval: null,
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
  };

  componentDidMount() {
    this.props.fetchTrendingMovies();
    this.startCarousel();
  }

  componentWillUnmount() {
    clearInterval(this.state.carouselInterval);
  }

  // INTERVAL SLIDE

  slideCarousel = () => {
    if (this.state.activeCarouselItem >= 4) {
      this.setState({ activeCarouselItem: 0 });
    } else {
      this.setState({ activeCarouselItem: this.state.activeCarouselItem + 1 });
    }
  };

  startCarousel = () => {
    const carouselTimer = setInterval(this.slideCarousel, 5000);

    this.setState({
      carouselInterval: carouselTimer,
    });
  };

  // MANUAL SLIDE

  changeSlide = (index) => {
    this.setState({
      activeCarouselItem: index,
    });
    clearInterval(this.state.carouselInterval);
    this.startCarousel();
  };

  selectItem = (index) => {
    const items = document.querySelectorAll('.carousel-slide');
    items[index].click();
  };

  // TOUCH FUNCTIONS

  touchStart = (index) => (event) => {
    this.setState({
      currentIndex: index,
      startPos: this.getPositionX(event),
      isDragging: true,
    });
    clearInterval(this.state.carouselInterval);
  };

  touchEnd = (event) => {
    const movedBy = this.state.currentTranslate - this.state.prevTranslate;

    if (movedBy < -100 && this.state.activeCarouselItem < 4)
      this.setState({ isDragging: false, activeCarouselItem: this.state.activeCarouselItem + 1 });

    if (movedBy > 100 && this.state.activeCarouselItem > 0)
      this.setState({ isDragging: false, activeCarouselItem: this.state.activeCarouselItem - 1 });

    this.startCarousel();
  };

  touchMove = (event) => {
    if (this.state.isDragging) {
      const currentPosition = this.getPositionX(event);
      this.setState({
        currentTranslate: this.state.prevTranslate + currentPosition - this.state.startPos,
      });
    }
  };

  getPositionX = (event) => event.touches[0].clientX;

  // RENDER

  CarouselSlider = (item, index) => (
    <Link
      className="carousel-main"
      to={`/movie/detail/${item.id}`}
      key={item.title}
      tabIndex="-1"
      style={{ transform: `translateX(${(index - this.state.activeCarouselItem) * 100}%` }}
      onTouchStart={this.touchStart(index)}
      onTouchEnd={this.touchEnd}
      onTouchMove={this.touchMove}
    >
      <LazyImage src={item.backdrop_path} alt={item.title} imageSize="w1280" thumbSize="w200" className="carousel-main__img" />
      <div className="carousel-main__details">
        <span className="carousel-main__details-category">Trending</span>
        <h2 className="carousel-main__details-title">{item.title}</h2>
        <div className="carousel-main__details-summary">
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{item.vote_average}</span>
          </div>
          <div className="date">
            <i className="far fa-calendar"></i>
            <span>{new Date(item.release_date).toDateString()}</span>
          </div>
        </div>
        <p className="carousel-main__details-overview">{item.overview.slice(0, 160) + '...'}</p>
      </div>
    </Link>
  );

  carouselListItem = (item, index) => (
    <div
      className={`carousel-list__item ${index === this.state.activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => this.changeSlide(index)}
      onFocus={() => this.changeSlide(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && this.selectItem(index)}
      tabIndex="0"
    >
      <img className="carousel-list__item-img" src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title} />
      <span className="carousel-list__item-title">{item.title}</span>
      <div className="carousel-list__item-background" />
    </div>
  );

  carouselIndicators = (item, index) => (
    <button
      className={`carousel-indicator__button ${index === this.state.activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => this.changeSlide(index)}
      onFocus={() => this.changeSlide(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && this.selectItem(index)}
      tabIndex="0"
    ></button>
  );

  renderContent() {
    return (
      <>
        <div className="carousel-inner">{this.props.trendingMovies.slice(0, 5).map(this.CarouselSlider)}</div>
        <div className="carousel-list">
          <h2 className="carousel-list__title">Trending Now</h2>
          {this.props.trendingMovies.slice(0, 5).map(this.carouselListItem)}
        </div>
        <div className="carousel-indicator">{this.props.trendingMovies.slice(0, 5).map(this.carouselIndicators)}</div>
      </>
    );
  }

  render() {
    return <div className="carousel">{this.props.trendingMovies ? this.renderContent() : <Loading />}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    trendingMovies: state.movies.trendingMovies,
  };
};

export default connect(mapStateToProps, { fetchTrendingMovies })(Carousel);
