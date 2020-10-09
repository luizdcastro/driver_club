import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useParams, Redirect } from 'react-router-dom';

import { resetPassword } from '../../redux/actions/password.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import LockIcon from '@material-ui/icons/Lock';
import './reset-password.styles.css';

const Register = ({ dispatchRestPassword }) => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [serverError, setServerError] = useState('');
  const [changedSuccess, setChangedSuccess] = useState(false);
  const { token } = useParams();

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchRestPassword(
      token,
      password,
      passwordConfirm,
      () => setChangedSuccess(true),
      (message) => setServerError(message)
    );
  };

  return (
    <div className="resetPassword-container">
      <div>
        <h2 className="resetPassword-title">Cadastre uma nova senha</h2>
        <form className="resetPassword" onSubmit={handleOnSubmmit}>
          <div className="resetPassword-input__group">
            <FormInput
              id="resetPassword-input__password"
              type="password"
              name="password"
              placeholder="Nova Senha"
              value={password}
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              id="resetPassword-input__confirm-password"
              type="password"
              name="passwordConfirm"
              placeholder="Confirmar Senha"
              value={passwordConfirm}
              handleChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <LockIcon className="resetPassword-input__icon " />
          </div>

          <CustomButton name="Alterar Senha" onClick={handleOnSubmmit} />
          {serverError ? (
            <p className="resetPassword-error">{serverError}</p>
          ) : null}
          {changedSuccess ? <Redirect to="/login" /> : null}
        </form>
      </div>
    </div>
  );
};

const mapDispathToProps = (dispatch) => ({
  dispatchRestPassword: (
    token,
    password,
    passwordConfirm,
    onSuccess,
    onError
  ) =>
    dispatch(
      resetPassword(token, { password, passwordConfirm }, onSuccess, onError)
    ),
});

export default connect(null, mapDispathToProps)(Register);
