import axios from 'axios';
import {
  CREATE_TWOT,
  DELETE_TWOT,
  POPULATE_TWOTS,
  LS_TOKEN_KEY,
  API_ERROR
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

function mapServerDataToTwots(serverData) {
  return serverData.twots.map((twot) => {
    return {
      id: twot['_id'],
      authorId: serverData.userid,
      authorName: serverData.fullname,
      avatarUrl: serverData.avatarUrl,
      text: twot.text,
      datePosted: twot.posted
    };
  });
}

export function createTwot(newTwot) {
  return function (dispatch) {
    const options = getOptions();
    axios.post(`${ROOT_URL}/twot`, JSON.stringify(newTwot), options )
      .then((resp) => {
        dispatch({
          type: CREATE_TWOT,
          payload: mapServerDataToTwots(resp.data)[0]
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

export function loadTwots(start) {
  return function (dispatch) {
    const options = getOptions();
    axios.get(`${ROOT_URL}/twot/${start}`, options)
      .then(({data}) => {
        dispatch({
          type: POPULATE_TWOTS,
          payload: { allTwots: mapServerDataToTwots(data) }
        });
      })
      .catch(err => console.error('Load data error (ignore on unit test)'));
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

