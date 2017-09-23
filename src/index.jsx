import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AppBody from './components/app-body';
import reducers from './reducers';
import Header from './components/header';
import requireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import { LS_TOKEN_KEY } from './constants';
import { loadCurrentUser, loadTwots } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
// Make sure to login if the user refreshes the page while signed in
const token = localStorage.getItem(LS_TOKEN_KEY);
const history = createBrowserHistory();
if (token) {
  const p = history.location.pathname;
  const hashtag = p.indexOf('/h/') < 0 ? null : p.substring(p.indexOf('/h/') + 3);
  store.dispatch(loadCurrentUser(token));
  store.dispatch(loadTwots(1, hashtag));
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              <Redirect to="/timeline" />
            }
          />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/timeline/h/:hashtag" component={requireAuth(AppBody)} />
          <Route path="/timeline" component={requireAuth(AppBody)} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
