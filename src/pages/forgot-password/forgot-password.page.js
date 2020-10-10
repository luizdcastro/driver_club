import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { forgotPassword } from '../../redux/actions/password.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import EmailIcon from '@material-ui/icons/Email';
import './forgot-password.styles.css';

const ForgotPassword = ({ dispatchForgotPassword }) => {
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');
  const [linkSent, setLinkSent] = useState(false);

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchForgotPassword(
      email,
      () => setLinkSent(true),
      (message) => setServerError(message)
    );
  };

  return (
    <div className="forgot-password__container">
      <div>
        <form className="forgot-password">
          <h2 className="forgot-password__title">Recuperar Senha</h2>
          {!linkSent ? (
            <div>
              <div className="forgot-input__group">
                <FormInput
                  id="forgot-input"
                  name="email"
                  type="email"
                  placeholder="Email Cadastrado"
                  handleChange={(e) => setEmail(e.target.value)}
                />
                <EmailIcon className="forgot-input__icon " />
              </div>
              <CustomButton name="Recuperar" onClick={handleOnSubmmit} />
        
                <Link className="forgotPassword-link" to="/login">Voltar para login</Link>
              
              {serverError ? (
                <p className="forgot-password__error">{serverError}</p>
              ) : null}
            </div>
          ) : (
            <div className="link-sent__content">
              <p className="link-sent__title">
                Email de reset enviado com sucesso!
              </p>
              <p>
                Verifique seu email e clique no link enviado para resetar sua
                senha. Caso não localize o email, verifique sua caixa de spam.
              </p>
              <Link className="link-sent__button" to="/login">
            Voltar para login
              </Link>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchForgotPassword: (email, onSuccess, onError) =>
    dispatch(forgotPassword({ email }, onSuccess, onError)),
});

export default connect(null, mapDispatchToProps)(ForgotPassword);
