import React from 'react';
import { ListItem, ItemIndex, ItemImg, ItemColPrimary, ItemTitle, ItemSmall, ItemColSecondary } from './Lists';

function MovieListItem({ movie, index }) {
  return (
    <ListItem link={`/${movie.category}/detail/${movie.id}`}>
      <ItemIndex>{++index}</ItemIndex>
      <ItemImg src={movie.poster} alt={movie.title}></ItemImg>
      <ItemColPrimary>
        <ItemTitle>{movie.title}</ItemTitle>
        <ItemSmall>{new Date(movie.releaseDate).toDateString()}</ItemSmall>
      </ItemColPrimary>
      <ItemColSecondary>
        <i className="fas fa-star list-item__icon"></i>
        <strong className="list-item__strong">{movie.rating}</strong>
      </ItemColSecondary>
      <ItemColSecondary>
        <i className="fas fa-poll list-item__icon"></i>
        <strong className="list-item__strong">{Math.round(movie.popularity)}</strong>
      </ItemColSecondary>
    </ListItem>
  );
}

export default MovieListItem;
