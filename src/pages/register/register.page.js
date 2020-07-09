import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { registerUser } from '../../redux/actions/auth.actions';
import { createIugoClient } from '../../redux/actions/iugo.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './register.styles.css';

const Register = ({ dispatchRegisterAction, dispatchIugoAction }) => {
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
    dispatchIugoAction(
      name,
      email,
      () => console.log('Client Iugo create'),
      (message) => setServerError(message)
    );
  };

  return (
    <div className="register-container">
      <div className="register">
        <h2 className="register-title">Cadastre uma nova conta</h2>
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
          <CustomButton
            type="submit"
            name="Registrar"
            onSubmit={handleOnSubmmit}
          />
          {serverError ? <p className="register-error">{serverError}</p> : null}
          <Link className="register-link" to="/login">
            Já possui uma conta?
          </Link>
        </form>
      </div>
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
  dispatchIugoAction: (name, email, onSuccess, onError) =>
    dispatch(createIugoClient({ name, email }, onSuccess, onError)),
});

export default connect(null, mapDispathToProps)(Register);
