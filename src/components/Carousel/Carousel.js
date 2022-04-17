/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCalendar } from '@fortawesome/free-solid-svg-icons';

import './carousel.scss';
import LazyImage from '../LazyImage/LazyImage';

export const Carousel = ({ title, content }) => {
  const [activeCarouselItem, setActiveCarouselItem] = useState(0);
  const [carouselInterval, setCarouselInterval] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [prevTranslate, setPrevTranslate] = useState(0);
  const [slideAnimate, setSlideAnimate] = useState(false);

  useEffect(() => {
    startCarousel();
  }, []);

  // INTERVAL SLIDE

  const slideCarousel = () => {
    if (activeCarouselItem >= 4) {
      setActiveCarouselItem(0);
    } else {
      setActiveCarouselItem(activeCarouselItem + 1);
    }
  };

  const startCarousel = () => {
    const carouselTimer = setInterval(slideCarousel, 5000);

    setCarouselInterval(carouselTimer);
  };

  // MANUAL SLIDE

  const changeSlide = (index) => {
    setActiveCarouselItem(index);
    clearInterval(carouselInterval);
    startCarousel();
  };

  const selectItem = (index) => {
    const items = document.querySelectorAll('.carousel-slide');
    items[index].click();
  };

  // TOUCH FUNCTIONS

  const touchStart = () => (event) => {
    setStartPos(getPositionX(event));
    setIsDragging(true);
    setSlideAnimate(true);
    clearInterval(carouselInterval);
  };

  const touchEnd = (event) => {
    const movedBy = currentTranslate - prevTranslate;

    if (movedBy < -60 && activeCarouselItem < 4) setActiveCarouselItem(activeCarouselItem + 1);

    if (movedBy > 60 && activeCarouselItem > 0) setActiveCarouselItem(activeCarouselItem - 1);

    setIsDragging(false);
    setSlideAnimate(false);
    startCarousel();
  };

  const touchMove = (event) => {
    if (isDragging) {
      const currentPosition = getPositionX(event);
      setCurrentTranslate(prevTranslate + currentPosition - startPos);
    }
  };

  const getPositionX = (event) => event.touches[0].clientX;

  // RENDER

  const CarouselSlider = (item, index) => (
    <Link
      className="carousel-main"
      to={`/movie/detail/${item.id}`}
      key={item.title}
      tabIndex="-1"
      style={{ transform: `translateX(${(index - activeCarouselItem) * 100}%)` }}
      onTouchStart={touchStart(index)}
      onTouchEnd={touchEnd}
      onTouchMove={touchMove}
    >
      <LazyImage src={item.backdrop_path} alt={item.title} imageSize="w1280" thumbSize="w200" className="carousel-main__img" />
      <div className="carousel-main__details">
        <span className="carousel-main__details-category">{title}</span>
        <h2 className="carousel-main__details-title">{item.title}</h2>
        <div className="carousel-main__details-summary">
          <div className="rating">
            <FontAwesomeIcon icon={faStar} />
            <span>{item.vote_average}</span>
          </div>
          <div className="date">
            <FontAwesomeIcon icon={faCalendar} />
            <span>{new Date(item.release_date).toDateString()}</span>
          </div>
        </div>
        <p className="carousel-main__details-overview">{item.overview.slice(0, 160) + '...'}</p>
      </div>
    </Link>
  );

  const carouselListItem = (item, index) => (
    <div
      className={`carousel-list__item ${index === activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => changeSlide(index)}
      onFocus={() => changeSlide(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && selectItem(index)}
      tabIndex="0"
    >
      <img className="carousel-list__item-img" src={`https://image.tmdb.org/t/p/w92${item.poster_path}`} alt={item.title} />
      <span className="carousel-list__item-title">{item.title}</span>
      <div className="carousel-list__item-background" />
    </div>
  );

  const carouselIndicators = (item, index) => (
    <button
      className={`carousel-indicator__button ${index === activeCarouselItem ? 'active' : ''}`}
      key={item.title}
      onClick={() => changeSlide(index)}
      onFocus={() => changeSlide(index)}
      onKeyDown={(e) => (e.code === 'Space' || e.code === 'Enter') && selectItem(index)}
      tabIndex="0"
    ></button>
  );

  return (
    <div className="carousel">
      <div className="carousel-inner" style={{ transform: `scale(${slideAnimate ? 0.95 : 1})` }}>
        {content.map(CarouselSlider)}
      </div>
      <div className="carousel-list">
        <h2 className="carousel-list__title">Trending Now</h2>
        {content.map(carouselListItem)}
      </div>
      <div className="carousel-indicator">{content.map(carouselIndicators)}</div>
    </div>
  );
};
