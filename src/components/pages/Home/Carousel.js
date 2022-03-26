import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchTrendingMovies } from '../../../actions';
import Loading from '../../Loading/Loading';

import './carousel.scss';
import LazyImage from '../../LazyImage/LazyImage';

class Carousel extends Component {
  state = {
    activeCarouselItem: 0,
    carouselInterval: null,
    isDragging: false,
    startPos: 0,
    currentTranslate: 0,
    prevTranslate: 0,
    animationID: 0,
    currentIndex: 0,
  };
  sliders = React.createRef();

  slideCarousel = () => {
    if (this.state.activeCarouselItem >= 4) {
      this.setState({ activeCarouselItem: 0 });
    } else {
      this.setState({ activeCarouselItem: this.state.activeCarouselItem + 1 });
    }
  };

  changeCarousel = (index) => {
    this.setState({
      activeCarouselItem: index,
    });
    clearInterval(this.state.carouselInterval);
    this.startCarousel();
  };

  startCarousel = () => {
    const carouselTimer = setInterval(this.slideCarousel, 5000);

    this.setState({
      carouselInterval: carouselTimer,
    });
  };

  selectItem = (index) => {
    const items = document.querySelectorAll('.carousel-slide');
    items[index].click();
  };

  componentDidMount() {
    this.props.fetchTrendingMovies();
    this.startCarousel();
  }

  componentWillUnmount() {
    clearInterval(this.state.carouselInterval);
  }

  touchStart = (index) => (event) => {
    this.setState({
      currentIndex: index,
      startPos: this.getPositionX(event),
      isDragging: true,
      // animationID: requestAnimationFrame(this.animation),
    });
    clearInterval(this.state.carouselInterval);
  };

  touchEnd = (event) => {
    // cancelAnimationFrame(this.state.animationID);

    const movedBy = this.state.currentTranslate - this.state.prevTranslate;

    if (movedBy < -100 && this.state.activeCarouselItem < 4)
      this.setState({ isDragging: false, activeCarouselItem: this.state.activeCarouselItem + 1 });

    if (movedBy > 100 && this.state.activeCarouselItem > 0)
      this.setState({ isDragging: false, activeCarouselItem: this.state.activeCarouselItem - 1 });

    this.startCarousel();
    // this.setPositionByIndex(event.target);
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

  // animation = () => {
  //   this.setSliderPosition();
  //   if (this.state.isDragging) requestAnimationFrame(this.animation);
  // };

  // setSliderPosition = () => {
  //   this.sliders.current.style.transform = `translateX(${this.state.currentTranslate}px)`;
  // };

  // setPositionByIndex = (slide) => {
  //   this.setState({
  //     currentTranslate: this.state.currentIndex * -slide.clientWidth,
  //     prevTranslate: this.state.currentTranslate,
  //   });

  //   this.setSliderPosition();

  //   console.log(this.state.currentIndex, this.state.currentTranslate, this.state.currentPosition);
  // };

  CarouselSlider = (item, index) => (
    <Link
      className={`carousel-main carousel-main-${index}`}
      to={`/movie/detail/${item.id}`}
      key={item.title}
      tabIndex="-1"
      style={{ transform: `translateX(${(index - this.state.activeCarouselItem) * 100}%` }}
      onTouchStart={this.touchStart(index)}
      onTouchEnd={this.touchEnd}
      onTouchMove={this.touchMove}
    >
      <LazyImage src={item.backdrop_path} alt={item.title} imageSize={'w1280'} thumbSize={'w200'} className={'carousel-main__img'} />
      <div className="carousel-main__details">
        <strong>Trending</strong>
        <h2>{item.title}</h2>
        <div className="summary">
          <div className="rating">
            <i className="fas fa-star"></i>
            <span>{item.vote_average}</span>
          </div>
          <div className="date">
            <i className="far fa-calendar"></i>
            <span>{new Date(item.release_date).toDateString()}</span>
          </div>
        </div>
        <p className="overview">{item.overview.slice(0, 160) + '...'}</p>
      </div>
    </Link>
  );

  CarouselItem = (item, index) => (
    <div
      className={`carousel-item ${index === this.state.activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => this.changeCarousel(index)}
      onFocus={() => this.changeCarousel(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && this.selectItem(index)}
      tabIndex="0"
    >
      <img className="carousel-item__img" src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title} />
      <span className="carousel-item__title">{item.title}</span>
      <div className="carousel-item__background" />
    </div>
  );

  CarouselController = (item, index) => (
    <button
      className={`carousel-controller__button ${index === this.state.activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => this.changeCarousel(index)}
      onFocus={() => this.changeCarousel(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && this.selectItem(index)}
      tabIndex="0"
    ></button>
  );

  renderContent() {
    return (
      <>
        <div className="carousel-slider">
          {/* <div className="slider-container" ref={this.sliders}> */}
          {this.props.trendingMovies.slice(0, 5).map(this.CarouselSlider)}
          {/* </div> */}
        </div>
        <div className="carousel-container">
          <h2 className="carousel-container__title">Trending Now</h2>
          {this.props.trendingMovies.slice(0, 5).map(this.CarouselItem)}
        </div>
        <div className="carousel-controller">{this.props.trendingMovies.slice(0, 5).map(this.CarouselController)}</div>
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
