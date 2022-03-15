import tmdb from '../apis/tmdb';
import createMovieList from '../utils/createMovieList';
import createSearchList from '../utils/createSearchList';
import createMovieDetails from '../utils/createMovieDetails';
import createTVDetails from '../utils/createTVDetails';
import createPersonDetails from '../utils/createPersonDetails';
import {
  FETCH_TRENDING_MOVIES,
  FETCH_POPULAR_MOVIES,
  FETCH_TOP_RATED_MOVIES,
  FETCH_UPCOMING_MOVIES,
  FETCH_MOVIE,
  FETCH_MOVIE_CREDITS,
  FETCH_PERSON,
  REMOVE_MOVIE,
  REMOVE_PERSON,
  FETCH_POPULAR_TV,
  FETCH_TOP_RATED_TV,
  FETCH_TV,
  FETCH_TV_CREDITS,
  SEARCH_QUERY,
  REMOVE_SEARCH_QUERY,
  REMOVE_TV,
  FETCH_PERSON_CREDITS,
  FETCH_NOW_PLAYING,
} from './types';

export const fetchTrendingMovies = () => async (dispatch) => {
  const response = await tmdb.get('/trending/movie/week');
  dispatch({
    type: FETCH_TRENDING_MOVIES,
    payload: response.data.results,
  });
};

export const fetchPopularMovies = () => async (dispatch) => {
  const response = await tmdb.get('/movie/popular');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_POPULAR_MOVIES,
    payload: list,
  });
};

export const fetchTopRatedMovies = () => async (dispatch) => {
  const response = await tmdb.get('/movie/top_rated');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_TOP_RATED_MOVIES,
    payload: list,
  });
};

export const fetchUpcomingMovies = () => async (dispatch) => {
  const response = await tmdb.get('/movie/upcoming');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_UPCOMING_MOVIES,
    payload: list,
  });
};

export const fetchNowPlaying = () => async (dispatch) => {
  const response = await tmdb.get('/movie/now_playing');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_NOW_PLAYING,
    payload: list,
  });
};

export const fetchMovie = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });

  const details = createMovieDetails(response.data);

  dispatch({
    type: FETCH_MOVIE,
    payload: details,
  });
};

export const fetchMovieCredits = (id) => async (dispatch) => {
  const response = await tmdb.get(`/movie/${id}/credits`);

  dispatch({
    type: FETCH_MOVIE_CREDITS,
    payload: response.data,
  });
};

export const removeMovie = () => {
  return {
    type: REMOVE_MOVIE,
    payload: null,
  };
};

export const fetchPopularTV = () => async (dispatch) => {
  const response = await tmdb.get('/tv/popular');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_POPULAR_TV,
    payload: list,
  });
};

export const fetchTopRatedTV = () => async (dispatch) => {
  const response = await tmdb.get('/tv/top_rated');
  const list = createMovieList(response.data.results);

  dispatch({
    type: FETCH_TOP_RATED_TV,
    payload: list,
  });
};

export const fetchTV = (id) => async (dispatch) => {
  const response = await tmdb.get(`/tv/${id}`, {
    params: {
      append_to_response: 'credits,videos,similar',
    },
  });

  const details = createTVDetails(response.data);

  dispatch({
    type: FETCH_TV,
    payload: details,
  });
};

export const removeTV = () => {
  return {
    type: REMOVE_TV,
    payload: null,
  };
};

export const fetchTVCredits = (id) => async (dispatch) => {
  const response = await tmdb.get(`/tv/${id}/credits`);

  dispatch({
    type: FETCH_TV_CREDITS,
    payload: response.data,
  });
};

export const fetchPerson = (id) => async (dispatch) => {
  const response = await tmdb.get(`/person/${id}`, {
    params: {
      append_to_response: 'credits',
    },
  });

  const details = createPersonDetails(response.data);

  dispatch({
    type: FETCH_PERSON,
    payload: details,
  });
};

export const fetchPersonCredits = (id) => async (dispatch) => {
  const response = await tmdb.get(`/person/${id}/combined_credits`);

  dispatch({
    type: FETCH_PERSON_CREDITS,
    payload: response.data,
  });
};

export const removePerson = () => {
  return {
    type: REMOVE_PERSON,
    payload: null,
  };
};

export const searchQuery = (query) => async (dispatch) => {
  const response = await tmdb.get(`/search/multi`, {
    params: {
      query,
    },
  });

  const list = createSearchList(response.data.results);

  dispatch({
    type: SEARCH_QUERY,
    payload: list,
  });
};

export const removeSearchQuery = () => {
  return {
    type: REMOVE_SEARCH_QUERY,
    payload: null,
  };
};
