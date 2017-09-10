import {
  CREATE_TWOT
} from '../constants';

export function createTwot(newTwot) {

  return {
    type: CREATE_TWOT,
    payload: newTwot
  };
}

