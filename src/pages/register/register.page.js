import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
  const [iugoId, setIugoId] = useState('');

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

  useEffect(() => {
    axios
      .post('https://api.iugu.com/v1/customers', {
        data: {
          name,
          email,
        },
        headers: {
          authorization:
            'Basic MmM1YjM3ODE4ZjE4YzlmYjY3YmQwNDcyOGI2ZDUxNTY6OTEyNTEwODZ3Nw',
        },
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type,Authorization',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,OPTIONS',
        'Access-Control-Allow-Credentials': 'true',
      })
      .then((res) => {
        const data = res.data;
        setIugoId(data);
      });
  }, []);

  return (
    <div className="register-container">
      <div className="register">
        <h2 className="register-title">Cadastre uma nova conta</h2>
        <form onSubmit={() => handleOnSubmmit}>
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
            onClick={() => handleOnSubmmit}
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
});

export default connect(null, mapDispathToProps)(Register);
