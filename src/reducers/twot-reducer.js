import { CREATE_TWOT, POPULATE_TWOTS, API_ERROR, LOGOUT_USER } from '../constants';

const INITIAL_STATE = { allTwots: [] };

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TWOT:
      return { ...state,
        allTwots: [action.payload, ...state.allTwots],
        error: '' };
    case POPULATE_TWOTS:
      return { allTwots: action.payload.allTwots };
    case API_ERROR:
      return { ...state, error: action.payload };
    case LOGOUT_USER:
      return INITIAL_STATE;
    default:
      return state;
  }
}

