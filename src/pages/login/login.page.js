import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { loginUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './login.styles.css';

const Login = ({ dispatchLoginAction }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchLoginAction(
      email,
      password,
      () => console.log('Logedd In'),
      (message) => setServerError(message)
    );
  };

  return (
    <div className="login-container">
      <div className="login">
        <h2 className="login-title">Entrar na sua conta</h2>
        <form onSubmit={handleOnSubmmit}>
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
          <CustomButton name="Login" onClick={() => handleOnSubmmit} />
          <div className="login-link__container">
            <Link className="login-link">Esqueceu sua senha?</Link>
            <Link to="/register" className="login-link">
              Criar uma conta
            </Link>
          </div>
          {serverError ? <p className="login-error">{serverError}</p> : null}
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(Login);
