import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';


import App from './components/app';
import reducers from './reducers';
import Header from './components/header';
import requireAuth from './components/auth/require_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout';
import Resources from './components/resources';
import { LS_TOKEN_KEY } from './constants';
import { loadCurrentUser } from './actions';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);
// Make sure to login if the user refreshes the page while signed in
const token = localStorage.getItem(LS_TOKEN_KEY);
if (token) {
  store.dispatch(loadCurrentUser(token));
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
              <Redirect to="/resources" />
            }
          />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
          <Route path="/signout" component={Signout} />
          <Route path="/resources" component={requireAuth(Resources)} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
