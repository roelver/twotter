import React, { Component } from 'react';

import Twot from './twot';
import Entry from './entry';

import { AppLeftBar, AppRightBar } from './snippets';

export default class AppBody extends Component {
  constructor(props) {
    super(props);
    this.addTwot = this.addTwot.bind(this);
    this.state = { allTwots: [] };
  }

  addTwot(text) {
    const newTwot = {
      id: this.state.allTwots.length + 1,
      author: 'Roel',
      text,
      datePosted: (new Date()).toTimeString()
    };
    this.setState({ allTwots: [...this.state.allTwots, newTwot] });
  }

  renderTwots() {
    if (this.state.allTwots.length > 0) {
      return this.state.allTwots.map((twot) => {
        return <Twot key={twot.id} twot={twot} />;
      });
    }
    return null;
  }

  render() {
    return (
      <div className="app-body">
        <AppLeftBar />

        <div className="col-xs-8 body-wrapper">
          <div className="row">
            <Entry addTwot={this.addTwot} />
          </div>
          { this.renderTwots() }
        </div>
        <AppRightBar />
      </div>
    );
  }
}
