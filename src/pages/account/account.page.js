import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

import { getMe } from '../../redux/actions/getme.action';
import {
  updateUser,
  updatePassword,
} from '../../redux/actions/account.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './account.styles.css';

const Account = ({
  getme,
  dispatchGetMeAction,
  dispatchUpdatePassword,
  dispatchUpdateUser,
}) => {
  const [name, setName] = useState(getme[0].name);
  const [email, setEmail] = useState(getme[0].email);
  const [serverErrorData, setServerErrorData] = useState('');
  const [serverErrorPassword, setServerErrorPassword] = useState('');
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [dataUpdated, setDataUpdated] = useState(false);
  const [passwordCurrent, setpasswordCurrent] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction]);

  const handleUpdateData = (event) => {
    event.preventDefault();
    dispatchUpdateUser(
      name,
      email,
      () => {
        setDataUpdated(true);
        setServerErrorData('');
      },
      (message) => setServerErrorData(message)
    );
    dispatchGetMeAction();
  };

  const handleUpdatePassword = (event) => {
    event.preventDefault();
    dispatchUpdatePassword(
      passwordCurrent,
      password,
      passwordConfirm,
      () => {
        setPasswordUpdated(true);
        setServerErrorPassword('');
      },
      (message) => setServerErrorPassword(message)
    );
    dispatchGetMeAction();
  };

  return (
    <div className="account-container">
      <h2 className="account-title">Configurações do Perfil</h2>
      <div className="account-content">
        <div className="account-data__pessoal ">
          <form onSubmit={handleUpdateData}>
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
            <CustomButton name="Salvar Alteração" onClick={handleUpdateData} />
            {serverErrorData ? (
              <p className="account-data__error">{serverErrorData}</p>
            ) : null}
            {dataUpdated ? (
              <p className="account-data__success">
                Dados alterados com sucesso!
              </p>
            ) : null}
          </form>
        </div>
        <div className="account-data__password">
          <form onSubmit={handleUpdatePassword}>
            <h3 className="account-data__subtitle">Alterar Senha</h3>
            <FormInput
              type="password"
              name="password"
              placeholder="Senha atual"
              handleChange={(e) => setpasswordCurrent(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Nova senha"
              handleChange={(e) => setPassword(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              placeholder="Confirmar senha"
              handleChange={(e) => setPasswordConfirm(e.target.value)}
            />
            <CustomButton name="Salvar Senha" onClick={handleUpdatePassword} />
            {serverErrorPassword ? (
              <p className="account-data__error">{serverErrorPassword}</p>
            ) : null}
            {passwordUpdated ? (
              <p className="account-data__success">
                Senha atualizada com sucesso!
              </p>
            ) : null}
          </form>
        </div>
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
  dispatchUpdatePassword: (
    passwordCurrent,
    password,
    passwordConfirm,
    onSuccess,
    onError
  ) =>
    dispatch(
      updatePassword(
        { passwordCurrent, password, passwordConfirm },
        onSuccess,
        onError
      )
    ),
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);
