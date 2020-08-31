import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { registerUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './register.styles.css';

const Register = ({ dispatchRegisterAction, dispatchGetme }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => dispatchGetme, [dispatchGetme]);

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
    dispatchGetme();
  };

  return (
    <div className="register-container">
      <form className="register" onSubmit={handleOnSubmmit}>
        <h2 className="register-title">Crie sua conta</h2>
        <FormInput
          type="name"
          name="name"
          placeholder="Nome"
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
          placeholder="Senha"
          value={password}
          handleChange={(e) => setPassword(e.target.value)}
        />
        <FormInput
          type="password"
          name="passwordConfirm"
          placeholder="Confirmação de Senha"
          value={passwordConfirm}
          handleChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <CustomButton name="Registrar" onClick={handleOnSubmmit} />
        {serverError ? <p className="register-error">{serverError}</p> : null}
        <Link className="register-link" to="/login">
          Já tem uma conta?
        </Link>
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
  dispatchGetme: () => dispatch(getMe()),
});

export default connect(null, mapDispathToProps)(Register);
