import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TwotType from '../types/twot';

const qImageUrl = '/assets/twitter-egg-icon.png';

// ({ twot, iconUrl })
class Twot extends Component {

  onDeleteClick() {
    this.props.onDeleteTwot(this.props.twot._id);
  }

  render() {
    const { twot } = this.props;
    return (
      <div className="twot row">
        <div className="bag">
          <div className="col-xs-2 icon">
            <img src={twot.user.avatarUrl || qImageUrl} alt="icon" />
          </div>
          <div className="col-xs-9 content">
            <div className="origin">
              <div className="author">{ twot.user.fullname }</div>
              <div className="date">{ twot.posted }</div>
            </div>
            <div className="message">{ twot.text }
            </div>
          </div>
          <div className="col-xs-1 settings">
            <div className="pull-right deleteTwot"
                 onClick={event => this.onDeleteClick(event)}>x</div>
          </div>
        </div>
      </div>
    );
  }
}

Twot.propTypes = {
  twot: PropTypes.shape(TwotType).isRequired,
  onDeleteTwot: PropTypes.func.isRequired
};

export default Twot;
