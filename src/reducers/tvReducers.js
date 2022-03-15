/* eslint-disable import/no-anonymous-default-export */
import { FETCH_TV, FETCH_POPULAR_TV, FETCH_TOP_RATED_TV, FETCH_TV_CREDITS, REMOVE_TV } from '../actions/types';

const INITIAL_STATE = {
  tv: null,
  credits: null,
  popularTV: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_POPULAR_TV:
      return { ...state, popularTV: action.payload };
    case FETCH_TOP_RATED_TV:
      return { ...state, topRatedTV: action.payload };
    case FETCH_TV:
      return { ...state, tv: action.payload };
    case FETCH_TV_CREDITS:
      return { ...state, credits: action.payload };
    case REMOVE_TV:
      return { ...state, tv: action.payload };
    default:
      return state;
  }
};
