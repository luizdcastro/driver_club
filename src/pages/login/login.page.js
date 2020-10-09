import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { loginUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
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
      <div>
        <h2 className="login-title">Entrar na sua conta</h2>
        <form className="login" onSubmit={handleOnSubmmit}>
          <div className="login-input__group">
            <FormInput
              id="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <PersonIcon className="login-input__icon" />
          </div>
          <div className="login-input__group">
            <FormInput
              id="login-input"
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <EmailIcon className="login-input__icon" />
          </div>
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
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchLoginAction: (email, password, onSuccess, onError) =>
    dispatch(loginUser({ email, password }, onSuccess, onError)),
  dispatchGetme: () => dispatch(getMe()),
});

export default connect(null, mapDispatchToProps)(Login);
