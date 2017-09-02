import React, { Component } from 'react';
import { connect } from 'react-redux';

import Twot from './twot';
import Entry from './entry';
import { createTwot } from '../actions';

import { AppLeftBar, AppRightBar } from './snippets';

class AppBody extends Component {
  constructor(props) {
    super(props);
    this.addTwot = this.addTwot.bind(this);
  }

  addTwot(text) {
    const newTwot = {
      id: this.props.allTwots.length + 1,
      authorName: this.props.user.fullname,
      authorId: this.props.user.email,
      text,
      datePosted: (new Date()).toTimeString()
    };
    this.props.createTwot(newTwot);
  }

  renderTwots() {
    if (this.props.allTwots.length > 0) {
      return this.props.allTwots.map((twot) => {
        return <Twot key={twot.id} twot={twot} iconUrl={this.props.user.avatarUrl }/>;
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

function mapStateToProps(state) {
  return {
    user: state.profile.user,
    allTwots: state.twot
  };
}

export default connect(mapStateToProps, { createTwot })(AppBody);
