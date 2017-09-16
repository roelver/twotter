import React, { Component } from 'react';
import PropTypes from 'prop-types';

const MAX = 141;

class Entry extends Component {

  constructor(props) {
    super(props);
    this.state = { text: '', textareaHeight: '58px' };
  }

  componentDidMount() {

  }

  onButtonClick() {
    if (this.state.text.length > 0) {
      this.props.addTwot(this.state.text);
      this.setState({ text: '' });
    }
  }

  onInputChange(text) {
    if (MAX - text.length >= 0) {
      this.setState({ text });
    }
  }

  onResize(event) {
    this.setState({ textareaHeight: event.target.style.height});
  }
  counterClass() {
    return `remain ${MAX - this.state.text.length > 0 ? '' : 'red'}`;
  }

  buttonStyle() {
    return this.state.textareaHeight ? { height: this.state.textareaHeight } : {};
  }

  render() {
    return (
      <div className="entry">
        <div className="input-group">
          <textarea
            id="twot"
            type="text"
            value={this.state.text}
            className="form-control"
            onChange={event => this.onInputChange(event.target.value)}
            onMouseMove={event => this.onResize(event)}
            placeholder="Twot...."
          />
          <div className="input-group-btn">
            <button
              className="btn btn-info"
              style={this.buttonStyle()}
              onClick={event => this.onButtonClick(event)}
            >Post</button>
          </div>
        </div>
        <div className="input-group">
          <div className={this.counterClass()}>
            [{ MAX - this.state.text.length}]
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;
