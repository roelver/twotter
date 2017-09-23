import axios from 'axios';
import {
  CREATE_TWOT,
  DELETE_TWOT,
  POPULATE_TWOTS,
  LS_TOKEN_KEY,
  API_ERROR,
  REMOVE_ALERT
} from '../constants';

import config from '../config';

const ROOT_URL = config.apiUrl;

function getOptions() {
  const token = localStorage.getItem(LS_TOKEN_KEY);
  const options = {
    headers: {
      Authorization: token,
      'Content-Type': 'application/json'
    }
  };
  return options;
}

export function createTwot(newTwot) {
  return function (dispatch) {
    const options = getOptions();
    axios.post(`${ROOT_URL}/twot`, JSON.stringify(newTwot), options )
      .then((resp) => {
        dispatch({
          type: CREATE_TWOT,
          payload: resp.data[0]
        });
      })
      .catch(err => {
        dispatch({
          type: API_ERROR,
          payload: err.message
        });
        console.error('Save error', err.message);
      });
  };
}

export function loadTwots(start, hashtag) {
  let hashtagPath = '';
  if (hashtag) {
    hashtagPath = `h/${hashtag}/`;
  }
  return function (dispatch) {
    const options = getOptions();
    axios.get(`${ROOT_URL}/twot/${hashtagPath}${start}`, options)
      .then(({ data }) => {
        dispatch({
          type: POPULATE_TWOTS,
          payload: { allTwots: data, error: '' }
        });
      })
      .catch(err => {
        dispatch({
          type: POPULATE_TWOTS,
          payload: { error: 'No twots are available' }
        });
        console.error('Load data error (ignore on unit test)');
      });
  };
}

export function deleteTwot(id) {
  return function (dispatch) {
    const options = getOptions();
    axios.delete(`${ROOT_URL}/twot/${id}`, options)
      .then(({data}) => {
        dispatch({
          type: DELETE_TWOT,
          payload: id
        });
      })
      .catch(err => console.error('Load data error (ignore on unit test)', err));
  };
}

export function removeAlert() {
  return {
    type: REMOVE_ALERT
  };
}
