import {
  CREATE_TWOT,
  DELETE_TWOT,
  POPULATE_TWOTS,
  API_ERROR,
  LOGOUT_USER,
  REMOVE_ALERT } from '../constants';

const INITIAL_STATE = { allTwots: [] };

export default function (state = INITIAL_STATE, action) {
  console.log('Reducer', action, state);
  switch (action.type) {
    case CREATE_TWOT:
      return { ...state,
        allTwots: [action.payload, ...state.allTwots],
        error: '' };
    case POPULATE_TWOTS:
      if (action.payload.allTwots) {
        return { allTwots: action.payload.allTwots };
      }
      return { ...state,
        error: action.payload.error };
    case DELETE_TWOT:
      const index = state.allTwots.findIndex((twot) => {
        return twot._id === action.payload;
      });
      return { ...state,
        allTwots: [
          ...state.allTwots.slice(0, index),
          ...state.allTwots.slice(index + 1)] };
    case API_ERROR:
      return { ...state, error: action.payload };
    case REMOVE_ALERT:
      return { ...state, error: '' };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

