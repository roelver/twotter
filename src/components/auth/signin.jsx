import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { signIn } from '../../actions/index';

class Signin extends Component {

  componentWillUpdate(props) {
    if (props.profile && props.profile.loggedIn) {
      this.props.history.push('/timeline');
    }
  }

  onSubmit(values) {
    this.props.signIn(values);
  }

  renderAlert() {
    if (this.props.profile.error) {
      return <div className="alert alert-danger">{ this.props.profile.error }</div>;
    }
    return null;
  }

  renderField(field) {
    const { touched, error } = field.meta;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    return (
      <fieldset className={className}>
        <label htmlFor={field.name}>{field.label}</label>
        <input
          {...field.input}
          type={field.type || 'text'}
          className="form-control"
        />
        {touched && error && <div className="text-help error-msg">{error}</div>}
      </fieldset>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Email"
            name="email"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            type="password"
            component={this.renderField}
          />
          { this.renderAlert() }
          <div>
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.userid) {
    errors.userid = 'Enter a email';
  }
  if (!values.password) {
    errors.password = 'Enter a password';
  }

  return errors;
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile
  };
};

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(mapStateToProps, { signIn })(Signin)
);

