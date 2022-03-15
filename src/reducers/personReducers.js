/* eslint-disable import/no-anonymous-default-export */
import { FETCH_PERSON, FETCH_PERSON_CREDITS, REMOVE_PERSON } from '../actions/types';

const INITIAL_STATE = {
  person: null,
  credits: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PERSON:
      return { ...state, person: action.payload };
    case FETCH_PERSON_CREDITS:
      return { ...state, credits: action.payload };
    case REMOVE_PERSON:
      return { ...state, person: action.payload };
    default:
      return state;
  }
};
