import {
  CREATE_TWOT,
  DELETE_TWOT,
  POPULATE_TWOTS,
  API_ERROR,
  LOGOUT_USER } from '../constants';

const INITIAL_STATE = { allTwots: [] };

export default function (state = INITIAL_STATE, action) {
  console.log(action);
  switch (action.type) {
    case CREATE_TWOT:
      return { ...state,
        allTwots: [action.payload, ...state.allTwots],
        error: '' };
    case POPULATE_TWOTS:
      return { allTwots: action.payload.allTwots };
    case DELETE_TWOT:
      console.log({ ...state,
        allTwots: [
          ...state.allTwots.slice(0, action.payload),
          ...state.allTwots.slice(action.payload + 1)] });
      return { ...state,
        allTwots: [
          ...state.allTwots.slice(0, action.payload),
          ...state.allTwots.slice(action.payload + 1)] };
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

