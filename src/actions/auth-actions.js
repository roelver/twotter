import { createBrowserHistory } from 'history';
import { loadTwots } from './twot-actions';

import { STORE_CURRENT_USER,
  STORE_TOKEN,
  SIGNIN_URL,
  LOGIN_FAILED,
  LOGOUT_USER,
  LS_TOKEN_KEY } from '../constants';


import config from '../config';

const ROOT_URL = config.apiUrl;

export function loginError(err) {
  return {
    type: LOGIN_FAILED,
    payload: err
  };
}

function processToken(resp, dispatch, event) {
  const token = resp.headers.get('Token');
  if (token && token.length > 0) {
    localStorage.setItem(LS_TOKEN_KEY, token);
    dispatch({
      type: STORE_TOKEN,
      payload: token
    });
  }
  resp.json()
    .then((user) => {
      return dispatch({
        type: STORE_CURRENT_USER,
        payload: user
      });
    })
    .catch((err) => {
      dispatch(loginError(`${event} failed (${err.message})`));
    });
}

export function loadCurrentUser(token) {
  return function (dispatch) {
    const history = createBrowserHistory();
    if (!token || token.length === 0) {
      history.push(SIGNIN_URL);
    } else {
      const options = {
        headers: new Headers({
          Authorization: token
        })
      };

      fetch(`${ROOT_URL}/me`, options)
        .then(resp => resp.json()
          .then(user => {
            return dispatch({
              type: STORE_CURRENT_USER,
              payload: user
            });
          })
        )
        .catch((err) => {
          loginError(err);
        });
    }
  };
}


export function signIn({ email, password }) {
  return function (dispatch) {
    localStorage.removeItem(LS_TOKEN_KEY);
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ email, password })
    };

    fetch(`${ROOT_URL}/signin`, options)
      .then((resp) => {
        if (resp.status > 399) {
          throw new Error('Invalid credentials');
        }
        processToken(resp, dispatch, 'Login');
      })
      .catch((err) => {
        dispatch(loginError(`Login failed (${err.message})`));
      });
  };
}

export function signupUser({ email, password, username, fullname, avatarUrl }) {
  return function(dispatch) {
    localStorage.removeItem(LS_TOKEN_KEY);
    const history = createBrowserHistory();
    const options = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ email, password, username, fullname, avatarUrl })
    };
    fetch(`${ROOT_URL}/signup`, options)
      .then((resp) => {
        if (resp.status > 399) {
          throw new Error('Signup failed');
        }
        processToken(resp, dispatch, 'Signup');
        history.push('/timeline');
      })
      .catch(response => dispatch(loginError(response.data.error)));
  };
}

export function signOut() {
  localStorage.removeItem(LS_TOKEN_KEY);
  return {
    type: LOGOUT_USER
  };
}
