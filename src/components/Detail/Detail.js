import React from 'react';
import LazyImage from '../LazyImage/LazyImage';

import './details.scss';

export const Detail = ({ children }) => <div className="details">{children}</div>;

export const DetailHeader = ({ children }) => <header className="details-header">{children}</header>;

export const HeaderBackdrop = ({ src, alt }) => {
  // src = src
  //   ? `https://image.tmdb.org/t/p/w1280${src}`
  //   : 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80';

  // return <img className="header-backdrop" src={src} alt={alt}></img>;
  return <LazyImage src={src} alt={alt} imageSize="w1280" thumbSize="w200" className="header-backdrop" />;
};

export const HeaderContent = ({ children }) => <div className="header-body">{children}</div>;

export const HeaderPoster = ({ src, alt }) => <LazyImage src={src} alt={alt} imageSize="w342" thumbSize="w92" className="header-body__poster" />;

export const HeaderBody = ({ children }) => <div className="header-body__content">{children}</div>;

export const HeaderTitle = ({ children }) => <h1>{children}</h1>;

export const HeaderSubTitle = ({ children }) => <div className="header-body__content-fact">{children}</div>;

export const HeaderActions = ({ children }) => <div className="header-body__content-actions">{children}</div>;

export const Header = ({ children, title, backdrop, poster }) => (
  <DetailHeader>
    <HeaderBackdrop src={backdrop} alt={title}></HeaderBackdrop>
    <HeaderContent>
      <HeaderPoster src={poster} alt={title}></HeaderPoster>
      <HeaderBody>
        <HeaderTitle>{title}</HeaderTitle>
        {children}
      </HeaderBody>
    </HeaderContent>
  </DetailHeader>
);

export const DetailMain = ({ children }) => <main className="details-main">{children}</main>;

export const DetailSection = ({ children }) => <section className="section">{children}</section>;

export const SectionTitle = ({ children }) => <h2 className="section-title">{children}</h2>;

export const SectionParagraph = ({ children }) => <p>{children}</p>;

export const SectionList = ({ children }) => <div className="details-overview__credits">{children}</div>;

export const SectionListItem = ({ label, value }) => (
  <p>
    <strong>{label}</strong>
    <span>{value}</span>
  </p>
);
