import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import { signupUser } from '../../actions';

class Signup extends Component {
  handleFormSubmit(values) {
    console.log
    // Call action creator to sign up the user!
    this.props.signupUser(values);
  }

  renderAlert() {
    if (this.props.profile.error) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.profile.error}
        </div>
      );
    }
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
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
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
        <Field
          label="Password Confirmation"
          name="passwordConfirm"
          type="password"
          component={this.renderField}
        />
        <Field
          label="Username (alias)"
          name="username"
          component={this.renderField}
        />
        <Field
          label="Full Name"
          name="fullname"
          component={this.renderField}
        />
        <Field
          label="Avatar URL"
          name="avatarUrl"
          component={this.renderField}
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  if (!formProps.username) {
    errors.username = 'Please enter a username';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    profile: state.profile
  };
}

export default reduxForm({
  validate,
  form: 'signup'
})(connect(mapStateToProps, { signupUser })(Signup));

