import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getMe } from '../../redux/actions/getme.action';
import { registerUser } from '../../redux/actions/auth.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import './register.styles.css';

const Register = ({ dispatchRegisterAction, dispatchGetme }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const name = `${firstName} ${lastName}`;

  useEffect(() => dispatchGetme, [dispatchGetme]);

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchRegisterAction(
      name,
      email,
      phone,
      password,
      passwordConfirm,
      () => console.log('Account created'),
      (message) => setServerError(message)
    );
    dispatchGetme();
  };

  return (
    <div className="register-container">
      <div>
        <form className="register" onSubmit={handleOnSubmmit}>
          <h2 className="register-title">
            Crie sua conta
          </h2>

          <div className="register-input__group">
            <FormInput
              id="register-input__firstname"
              type="name"
              name="fistname"
              placeholder="Nome"
              value={firstName}
              handleChange={(e) => setFirstName(e.target.value)}
            />
            <FormInput
              id="register-input__lastname"
              type="name"
              name="lastname"
              placeholder="Sobrenome"
              value={lastName}
              handleChange={(e) => setLastName(e.target.value)}
            />
            <PersonIcon className="register-input__icon" />
          </div>
          <div className="register-input__group">
            <FormInput
              id="register-input"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              handleChange={(e) => setEmail(e.target.value)}
            />
            <EmailIcon className="register-input__icon" />
          </div>
          <div className="register-input__group">
            <FormInput
              id="register-input__password"
              type="password"
              name="password"
              placeholder="Senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              id="register-input__confirm-password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirmar senha"
              value={passwordConfirm}
              handleChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <LockIcon className="register-input__icon" />
          </div>
          <CustomButton name="Registrar" onClick={handleOnSubmmit} />

          {serverError ? <p className="register-error">{serverError}</p> : null}
          <Link className="register-link" to="/login">
            Voltar para login
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
    phone,
    password,
    passwordConfirm,
    onSuccess,
    onError
  ) =>
    dispatch(
      registerUser(
        { name, email, phone, password, passwordConfirm },
        onSuccess,
        onError
      )
    ),
  dispatchGetme: () => dispatch(getMe()),
});

export default connect(null, mapDispathToProps)(Register);
