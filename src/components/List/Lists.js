import React from 'react';
import { Link } from 'react-router-dom';
import LazyImage from '../LazyImage/LazyImage';

import './lists.scss';

export const List = ({ children }) => <div className="list">{children}</div>;

export const ListHeader = ({ children }) => <h1 className="list-header">{children}</h1>;

export const ListItem = ({ children, link }) => (
  <Link className="list-item" to={link}>
    {children}
  </Link>
);

export const ItemIndex = ({ children }) => <span className="list-item__index">{children}</span>;

export const ItemImg = ({ src, alt, variant }) => (
  <LazyImage src={src} alt={alt} imageSize={'w185'} thumbSize={'w92'} className={`list-item__img ${variant}`} />
);

export const ItemColPrimary = ({ children }) => <div className="list-item__col--primary">{children}</div>;

export const ItemColSecondary = ({ children }) => <div className="list-item__col--secondary">{children}</div>;

export const ItemTitle = ({ children }) => <h2 className="list-item__title">{children}</h2>;

export const ItemSmall = ({ children }) => <small className="list-item__small">{children}</small>;
