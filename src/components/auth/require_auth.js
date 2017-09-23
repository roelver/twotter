import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createBrowserHistory } from 'history';

import { SIGNIN_URL } from '../../constants';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        const history = createBrowserHistory();
        this.context.router.history.push(`${SIGNIN_URL}?${history.location.pathname}`);
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.authenticated) {
        this.context.router.history.push(SIGNIN_URL);
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.profile.loggedIn };
  }

  return connect(mapStateToProps)(Authentication);
}
