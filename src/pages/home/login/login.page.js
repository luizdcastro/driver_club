import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { loginUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
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
        <form className="login" onSubmit={handleOnSubmmit}>
          <h2 className="login-title">Faça seu login</h2>
          <div className="login-input__group">
            <FormInput
              id="login-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <EmailIcon className="login-input__icon" />
          </div>
          <div className="login-input__group">
            <FormInput
              id="login-input__password"
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <LockIcon className="login-input__icon" /> 
            <Link className="login-link__password" to="/forgot-password">
            Esqueci minha senha            
            </Link>          
          </div>
          <CustomButton id="login-button" name="Entrar" onClick={handleOnSubmmit} />
          <div className="login-link__container"> 
          <p className="login-link__text">Não tem uma conta? <span><Link to="/register" className="login-link">
Registre-se </Link></span></p>           
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
