import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  onButtonClick() {
    this.props.addTwot(this.state.text);
    this.setState({ text: '' });
  }

  onInputChange(text) {
    this.setState({ text });
  }

  render() {
    return (
      <div className="entry">
        <div className="input-group">
          <input
            id="twot"
            type="text"
            value={this.state.text}
            className="form-control"
            onChange={event => this.onInputChange(event.target.value)}
            placeholder="Twot...."
          />
          <span className="input-group-btn">
            <button
              className="btn btn-info"
              onClick={event => this.onButtonClick(event)}
            >Post</button>
          </span>
        </div>
      </div>
    );
  }
}

Entry.propTypes = {
  addTwot: PropTypes.func.isRequired
};

export default Entry;
