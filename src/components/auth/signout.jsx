import React, { Component } from 'react';
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

export default connect(null, { signOut })(Signout);
