import React from 'react';
import { Link } from 'react-router-dom';

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
  <img
    className={`list-item__img ${variant}`}
    src={src ? `https://image.tmdb.org/t/p/w92${src}` : 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='}
    alt={alt}
  ></img>
);

export const ItemColPrimary = ({ children }) => <div className="list-item__col--primary">{children}</div>;

export const ItemColSecondary = ({ children }) => <div className="list-item__col--secondary">{children}</div>;

export const ItemTitle = ({ children }) => <h2 className="list-item__title">{children}</h2>;

export const ItemSmall = ({ children }) => <small className="list-item__small">{children}</small>;
