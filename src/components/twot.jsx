import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const qImageUrl = '/assets/twitter-egg-icon.png';
const hashtagPath = '/timeline/h/';

// ({ twot, iconUrl })
class Twot extends Component {
  onDeleteClick() {
    this.props.onDeleteTwot(this.props.twot._id);
  }

  renderTwotText(text) {
    const convert = text.replace(/(#)([a-zA-Z0-9]*)([^a-zA-Z0-9]|$)/g,
      '*@@*$1|@@|$2|@@|$3*@@*');
    const parts = convert.split('*@@*');
    const line = parts.map((part, index) => {
      if (part.length === 0) return '';
      if (part.indexOf('|@@|') < 0) return part;
      const tags = part.split('|@@|');
      return (
        <span key={index}>
          {tags[0].replace('#','')}
          <Link to={`${hashtagPath}${tags[1]}`}>#{tags[1]}</Link>{tags[2]}
        </span>
      );
    });
    return line;
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
            <div className="message">{ this.renderTwotText(twot.text) }
            </div>
          </div>
          <div className="col-xs-1 settings">
            <div
              className="pull-right deleteTwot"
              onClick={event => this.onDeleteClick(event)}
            >&times;</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Twot;
