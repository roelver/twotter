import React from 'react';
import PropTypes from 'prop-types';

import TwotType from '../types/twot';

const qImageUrl = '/assets/twitter-egg-icon.png';

const Twot = ({ twot, iconUrl }) => {
  return (
    <div className="twot row">
      <div className="bag">
        <div className="col-xs-2 icon">
          <img src={iconUrl || qImageUrl} alt="icon" />
        </div>
        <div className="col-xs-9 content">
          <div className="origin">
            <div className="author">{ twot.authorName }</div>
            <div className="date">{ twot.datePosted }</div>
          </div>
          <div className="message">{ twot.text }
          </div>
        </div>
        <div className="col-xs-1 settings" />
      </div>
    </div>
  );
};

Twot.propTypes = {
  twot: PropTypes.shape(TwotType).isRequired
};

export default Twot;
