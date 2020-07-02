import React, { useState } from 'react';
import { connect } from 'react-redux';

import { registerUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './register.styles.css';

const Register = ({ dispatchRegisterAction }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverError, setServerError] = useState('');

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchRegisterAction(
      name,
      email,
      password,
      passwordConfirm,
      () => console.log('Account created'),
      (message) => setServerError(message)
    );
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleOnSubmmit}>
        <FormInput
          type="name"
          name="name"
          placeholder="Name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <FormInput
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={passwordConfirm}
          handleChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <CustomButton name="Register" onClick={handleOnSubmmit} />
        {serverError ? (
          <div>
            <p>{serverError}</p>
          </div>
        ) : null}
      </form>
    </div>
  );
};

const mapDispathToProps = (dispatch) => ({
  dispatchRegisterAction: (
    name,
    email,
    password,
    passwordConfirm,
    onSuccess,
    onError
  ) =>
    dispatch(
      registerUser(
        { name, email, password, passwordConfirm },
        onSuccess,
        onError
      )
    ),
});

export default connect(null, mapDispathToProps)(Register);
