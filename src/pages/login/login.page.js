import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { loginUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './login.styles.css';

const Login = ({ dispatchLoginAction, dispatchGetme }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => dispatchGetme, [dispatchGetme]);

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchLoginAction(
      email,
      password,
      () => console.log('Logged In'),
      (message) => setServerError(message)
    );
    dispatchGetme();
  };
  return (
    <div className="login-container">
      <form className="login" onSubmit={handleOnSubmmit}>
        <h2 className="login-title">Entrar na sua conta</h2>
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
          placeholder="Senha"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <CustomButton name="Entrar" onClick={handleOnSubmmit} />
        <div className="login-link__container">
          <Link className="login-link" to="/forgot-password">
            Esqueceu sua senha?
          </Link>
          <Link to="/register" className="login-link">
            Criar uma conta
          </Link>
        </div>
        {serverError ? <p className="login-error">{serverError}</p> : null}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
  dispatchGetme: () => dispatch(getMe()),
});

export default connect(null, mapDispatchToProps)(Login);
