import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { SIGNIN_URL } from '../../constants';

export default function(ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.authenticated) {
        this.context.router.history.push(SIGNIN_URL);
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
