/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from 'react';

function LazyImage({ src, alt, thumbSize, imageSize, className }) {
  const imageRef = useRef();

  const catSrc = (src, size) => {
    if (!src) return 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    return `https://image.tmdb.org/t/p/${size}${src}`;
  };

  useEffect(() => {
    const loadImage = (entries, observer) => {
      const [entry] = entries;

      if (!entry.isIntersecting) return false;

      entry.target.src = catSrc(src, imageSize);

      entry.target.addEventListener('load', () => {
        entry.target.classList.remove('lazy-img--loading');
      });
    };

    const imageObserver = new IntersectionObserver(loadImage, {
      root: null,
      threshold: 0.5,
    });

    imageObserver.observe(imageRef.current);
  }, []);

  return <img className={`${className} lazy-img lazy-img--loading`} src={catSrc(src, thumbSize)} alt={alt} ref={imageRef}></img>;
}

export default LazyImage;
