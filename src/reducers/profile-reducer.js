import { STORE_CURRENT_USER, STORE_TOKEN, LOGOUT_USER, LOGIN_FAILED, API_ERROR } from '../constants';

const INITIAL_STATE = {};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case STORE_CURRENT_USER:
      return { ...state, user: { ...action.payload }, loggedIn: true, error: '' };
    case STORE_TOKEN:
      return { ...state, token: action.payload, error: '' };
    case LOGIN_FAILED:
      return { ...state, error: action.payload };
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

