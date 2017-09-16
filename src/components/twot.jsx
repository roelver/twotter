import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TwotType from '../types/twot';

const qImageUrl = '/assets/twitter-egg-icon.png';

// ({ twot, iconUrl })
class Twot extends Component {

  onDeleteClick() {
    this.props.onDeleteTwot(this.props.idx);
  }

  render() {
    const { twot } = this.props;
    return (
      <div className="twot row">
        <div className="bag">
          <div className="col-xs-2 icon">
            <img src={this.props.iconUrl || qImageUrl} alt="icon" />
          </div>
          <div className="col-xs-9 content">
            <div className="origin">
              <div className="author">{ twot.authorName }</div>
              <div className="date">{ twot.datePosted }</div>
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
  idx: PropTypes.number.isRequired,
  onDeleteTwot: PropTypes.func.isRequired
};

export default Twot;
