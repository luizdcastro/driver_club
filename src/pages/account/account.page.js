import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getMe } from '../../redux/actions/getme.action';
import { updateUser } from '../../redux/actions/account.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './account.styles.css';

const Account = ({ getme, dispatchGetMeAction, dispatchUpdateUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [serverError, setServerError] = useState('');

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatchUpdateUser(
      name,
      email,
      () => console.log('Updated'),
      (message) => setServerError(message)
    );
    dispatchGetMeAction();
  };

  return (
    <div className="account-container">
      <h2 className="account-title">Configurações da Conta</h2>
      <div className="account-data__pessoal ">
        <form onSubmit={handleSubmit}>
          <h3 className="account-data__subtitle">Dados Pessoais</h3>
          <FormInput
            type="text"
            name="name"
            placeholder={getme[0].name}
            value={name}
            handleChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="email"
            name="email"
            placeholder={getme[0].email}
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />
          <CustomButton name="Save Changes" onClick={handleSubmit} />
          {serverError ? (
            <p className="account-data__error">{serverError}</p>
          ) : null}
        </form>
      </div>
      <div className="account-data__password">
        <form>
          <h3 className="account-data__subtitle">Alterar Senha</h3>
          <FormInput
            type="password"
            name="password"
            placeholder="Senha atual"
          />
          <FormInput type="password" name="password" placeholder="Nova senha" />
          <FormInput
            type="password"
            name="password"
            placeholder="Confirmar senha"
          />
          <CustomButton name="Change Password" />
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchUpdateUser: (name, email, onSuccess, onError) =>
    dispatch(updateUser({ name, email }, onSuccess, onError)),
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
