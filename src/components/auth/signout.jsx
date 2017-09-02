import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { signOut } from '../../actions';

class Signout extends Component {
  componentDidMount() {
    this.props.signOut();
  }
  render() {
    return <div>Sorry to see you go...</div>;
  }
}

Signout.propTypes = {
  signOut: PropTypes.func
};
Signout.defaultProps = {
  signOut: () => {}
};

export default connect(null, { signOut })(Signout);
