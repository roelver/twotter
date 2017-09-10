import { CREATE_TWOT } from '../constants';

const INITIAL_STATE = [];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case CREATE_TWOT:
      return [...state, action.payload];
    default:
      return state;
  }
}

