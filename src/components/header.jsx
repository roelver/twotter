import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import { signOut } from '../actions';
import { SIGNIN_URL } from '../constants';

const propTypes = {
  user: PropTypes.object,
  loggedIn: PropTypes.bool
};

const defaultProps = {
  user: {},
  loggedIn: false,
  signOut: () => { return null; },
};


class Header extends Component {
  renderLinksLeft() {
    if (this.props.loggedIn && this.props.user) {
      return (
        <ul className="nav navbar-nav">
          <li className="nav-item" key="timeline">
            <NavLink
              to="/timeline"
              activeClassName="active"
              className="nav-link"
            >
                Timeline
            </NavLink>
          </li>
        </ul>
      );
    }
    return null;
  }

  renderLinksRight() {
    if (this.props.loggedIn) {
      return (
        <li className="nav-item" key="signout">
          <NavLink
            to="/signout"
            activeClassName="active"
            className="nav-link"
          >
            Sign Out
          </NavLink>
        </li>
      );
    }
    return (
      <li className="nav-item" key="signin">
        <NavLink
          to={SIGNIN_URL}
          activeClassName="active"
          className="nav-link"
        >
          Signin
        </NavLink>
      </li>
    );
  }

  render() {
    return (
      <nav className="navbar navbar-light">
        <div className="container-fluid">
          <div className="navbar-header">
            <Link to="/" className="navbar-brand">TWOTTER</Link>
          </div>
          <div id="navbar">
            { this.renderLinksLeft() }
            <ul className="nav navbar-nav navbar-nav-right">
              { this.renderLinksRight() }
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    loggedIn: state.profile.loggedIn,
    user: state.profile.user,
  };
};

// Import router info (current path) with withRouter
export default withRouter(
  connect(mapStateToProps, { signOut })(Header));
