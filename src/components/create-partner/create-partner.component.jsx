import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';

import { createPartner } from '../../redux/actions/partner.actions';
import { getPartnerByUser } from '../../redux/actions/partner.actions';
import FormInput from '../../components/form-input/form-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import UploadImage from '../../components/upload-image/upload-image.component';
import './create-partner.styles.css';

const CreatePartner = ({
  user,
  dispatchCreatePartner,
  dispatchGetPartnerByUser,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState('');
  const [open_at, setOpen_at] = useState('');
  const [close_at, setClose_at] = useState('');
  const [created, setCreated] = useState('');
  const [serverError, setServerError] = useState('');
  const [cash, setCash] = useState('');
  const [master, setMaster] = useState('');
  const [visa, setVisa] = useState('');
  const [checkedCash, setCheckedCash] = useState(true);
  const [checkedMaster, setCheckedMaster] = useState(true);
  const [checkedVisa, setCheckedVisa] = useState(true);
  const paymentMethods = [cash, master, visa];
  const userId = user.userId;

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchCreatePartner(
      user.userId,
      name,
      category,
      () => setCreated(true),
      (message) => setServerError(message)
    );
    if (created) {
      dispatchGetPartnerByUser(userId);
    }
    setCreated('');
  };

  useEffect(() => {
    dispatchGetPartnerByUser(userId);
  }, [dispatchGetPartnerByUser, userId, created]);

  return (
    <div>
      <h2>Adicione seu estabelecimento</h2>
      <form onSubmit={handleOnSubmmit}>
        <label>Informações Básicas</label>
        <FormInput
          type="text"
          name="name"
          placeholder="Nome do negócio"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <MaskedInput
          className="form-input"
          mask={[
            '(',
            /[1-9]/,
            /\d/,
            ')',
            ' ',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            '-',
            /\d/,
            /\d/,
            /\d/,
            /\d/,
            /\d/,
          ]}
          placeholder="Telefone"
          placeholderChar={'\u2000'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <FormInput
          type="text"
          name="site"
          placeholder="Website"
          value={website}
          handleChange={(e) => setWebsite(e.target.value)}
        />
        <select
          className="create-partner__select-category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Selecione uma categoria
          </option>
          <option className="create-partner__select-category" value="postos">
            Postos
          </option>
          <option value="locadoras">Locadoras</option>
          <option value="seguros">Seguros</option>
          <option value="alimentação">Alimentação</option>
          <option value="manutenção">Manutenção</option>
          <option value="lava-car">Lava-car</option>
          <option value="lazer">Lazer</option>
        </select>
        <label>Hoarário de atendimento</label>
        <div className="create-partner__time-container">
          <FormInput
            id="create-partner__input-time"
            type="time"
            value={open_at}
            onChange={(e) => setOpen_at(e.target.value)}
            min="00:00"
            max="23:00"
          />
          <span>às</span>
          <FormInput
            id="create-partner__input-time"
            type="time"
            value={close_at}
            onChange={(e) => setClose_at(e.target.value)}
            min="00:00"
            max="23:00"
          />
        </div>
        <label>Métodos de Pagamento</label>
        <br />
        <input
          type="checkbox"
          value="Dinheiro"
          onChange={(e) => {
            setCheckedCash(!checkedCash);
            checkedCash ? setCash(e.target.value) : setCash('');
          }}
        />
        <label>Dinheiro</label>
        <br />
        <input
          type="checkbox"
          value="Mastercard"
          onChange={(e) => {
            setCheckedMaster(!checkedMaster);
            checkedMaster ? setMaster(e.target.value) : setMaster('');
          }}
        />
        <label>Mastercard</label>
        <br />
        <input
          type="checkbox"
          value="Visa"
          onChange={(e) => {
            setCheckedVisa(!checkedVisa);
            checkedVisa ? setVisa(e.target.value) : setVisa('');
          }}
        />
        <label>Visa</label>
        <br />
        <label>Imagem</label>
        <UploadImage />
        <label>Endereço</label>
        <FormInput
          type="text"
          name="rua"
          placeholder="Rua"
          value={category}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <FormInput
          type="text"
          name="numero"
          placeholder="Número"
          value={category}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <FormInput
          type="text"
          name="numero"
          placeholder="Bairro"
          value={category}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <FormInput
          type="text"
          name="numero"
          placeholder="Cidade"
          value={category}
          handleChange={(e) => setCategory(e.target.value)}
        />
        <CustomButton name="Cadastrar" onClick={() => handleOnSubmmit} />
        {serverError ? <p className="login-error">{serverError}</p> : null}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCreatePartner: (user, name, category, onSuccess, onError) =>
    dispatch(createPartner({ user, name, category }, onSuccess, onError)),
  dispatchGetPartnerByUser: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  partner: state.partner,
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePartner);
