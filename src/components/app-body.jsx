import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnimateHeight from 'react-animate-height';

import Twot from './twot';
import Entry from './entry';
import { createTwot, loadTwots, deleteTwot, removeAlert } from '../actions';

import { AppLeftBar, AppRightBar } from './snippets';

class AppBody extends Component {
  constructor(props) {
    super(props);
    this.addTwot = this.addTwot.bind(this);
    this.onDeleteTwot = this.onDeleteTwot.bind(this);
    this.onAlertClose = this.onAlertClose.bind(this);
    this.state = { errorMessage: ''};
  }

  componentWillMount() {
    this.props.loadTwots(1, this.props.match.params.hashtag);
  }

  componentWillReceiveProps(nextProps) {
    console.log('ReceiveProps', nextProps);
    setTimeout(this.setState({ errorMessage: nextProps.error }), 1000);
    if (nextProps.match.params.hashtag !== this.props.match.params.hashtag) {
      this.props.loadTwots(1, nextProps.match.params.hashtag);
    }
  }

  onDeleteTwot(id) {
    this.props.deleteTwot(id);
  }

  onAlertClose() {
    this.props.removeAlert();
  }

  addTwot(text) {
    const newTwot = {
      text
    };
    this.props.createTwot(newTwot);
  }

  renderTwots() {
    let msg = '';
    let twots = '';
    if (this.props.error && this.props.error.length > 0) {
      msg = (
        <div key="alert" className="alert alert-danger alert-dismissible">
          <a href="#" className="close" onClick={this.onAlertClose}>&times;</a>
          {this.state.errorMessage}
        </div>
      );
    }
    if (this.props.allTwots && this.props.allTwots.length > 0) {
      twots = (
        this.props.allTwots.map((twot) => {
          return (
            <Twot
              key={twot._id}
              twot={twot}
              onDeleteTwot={this.onDeleteTwot}
            />
          );
        })
      );
    }
    return (
      <div>
        <AnimateHeight
          duration={500}
          height={this.props.alertHeight}
        >
          { msg }
        </AnimateHeight>
        { twots }
      </div>
    );
  }

// <CSSTransitionGroup
// transitionName="twotlist"
// transitionAppear={true}
// transitionEnter={true}
// transitionLeave={true}
// transitionEnterTimeout={300}
// transitionLeaveTimeout={300}
// transitionAppearTimeout={100}
// >
// { msg }
// </CSSTransitionGroup>

  render() {
    return (
      <div className="app-root">
        <div className="row">
          <div className="col-xs-12">
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
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  console.log('map', state);
  return {
    user: state.profile.user,
    allTwots: state.twot.allTwots,
    error: state.twot.error,
    alertHeight: (state.twot.error && state.twot.error.length > 0 ? 60 : 0)
  };
}

export default connect(mapStateToProps, { createTwot, loadTwots, deleteTwot, removeAlert })(AppBody);
