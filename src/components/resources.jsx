import React, { Component } from 'react';
import { VIEW_ROLE } from '../constants';

class Resources extends Component {

  static getRequiredRole() {
    return VIEW_ROLE;
  }

  render() {
    return (
      <div>
        <h1>Super secret recipe</h1>
        <ul>
          <li>2 eggs</li>
          <li>2 slices of bacon</li>
        </ul>
      </div>
    );
  };
}

export const requiredRole = Resources.getRequiredRole();
export default Resources;