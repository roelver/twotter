import React, { Component } from 'react';
import { LS_TOKEN_KEY } from '../../constants';

class Signout extends Component {
  componentWillMount() {
    localStorage.removeItem(LS_TOKEN_KEY);
  }
  render() {
    return <div>Sorry to see you go...</div>;
  }
}

export default Signout;
