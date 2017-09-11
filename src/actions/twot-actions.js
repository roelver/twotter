import axios from 'axios';
import {
  CREATE_TWOT,
  POPULATE_TWOTS,
  LS_TOKEN_KEY
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
      .catch(err => console.error('Save error', err));
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
      .catch(err => console.error('Load data error', err));
  };
}

