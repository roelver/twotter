import { CREATE_TWOT, POPULATE_TWOTS } from '../constants';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TWOT:
      return [action.payload, ...state];
    case POPULATE_TWOTS:
      return action.payload.allTwots;
    default:
      return state;
  }
}

