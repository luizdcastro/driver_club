import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';

import { createPartner } from '../../redux/actions/partner.actions';
import { getPartnerByUser } from '../../redux/actions/partner.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import UploadImage from '../upload-image/upload-image.component';
import './create-store.component';
const CreateStoreComponent = ({
  user,
  uploadImage,
  dispatchCreatePartner,
  dispatchGetPartnerByUser,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [category, setCategory] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [city, setCity] = useState('');
  const [open_at, setOpen_at] = useState('');
  const [close_at, setClose_at] = useState('');
  const [cash, setCash] = useState('');
  const [master, setMaster] = useState('');
  const [visa, setVisa] = useState('');
  const [checkedCash, setCheckedCash] = useState(true);
  const [checkedMaster, setCheckedMaster] = useState(true);
  const [checkedVisa, setCheckedVisa] = useState(true);
  const [created, setCreated] = useState('');
  const [serverError, setServerError] = useState('');
  const userId = user.userId;
  const image = uploadImage.url;

  const paymentMethods = [cash, master, visa];
  const address = {
    street: street,
    number: number,
    neighborhood: neighborhood,
    city: city,
  };
  const hours = {
    open_at: open_at,
    close_at: close_at,
  };

  const handleOnSubmmit = (event) => {
    event.preventDefault();
    dispatchCreatePartner(
      user.userId,
      name,
      category,
      address,
      phone,
      website,
      hours,
      paymentMethods,
      image,
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
    <div className="create-partner__container">
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
          />
        </div>
        <label>Métodos de Pagamento</label>
        <div className="create-paertner__payment">
          <div>
            <input
              type="checkbox"
              value="Dinheiro"
              onChange={(e) => {
                setCheckedCash(!checkedCash);
                checkedCash ? setCash(e.target.value) : setCash('');
              }}
            />
            <label>Dinheiro</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Mastercard"
              onChange={(e) => {
                setCheckedMaster(!checkedMaster);
                checkedMaster ? setMaster(e.target.value) : setMaster('');
              }}
            />
            <label>Mastercard</label>
          </div>
          <div>
            <input
              type="checkbox"
              value="Visa"
              onChange={(e) => {
                setCheckedVisa(!checkedVisa);
                checkedVisa ? setVisa(e.target.value) : setVisa('');
              }}
            />
            <label>Visa</label>
          </div>
        </div>
        <label>Imagem</label>
        <UploadImage imageUrl />
        <label>Endereço</label>
        <FormInput
          type="text"
          name="rua"
          placeholder="Rua"
          value={street}
          handleChange={(e) => setStreet(e.target.value)}
        />
        <FormInput
          type="text"
          name="numero"
          placeholder="Número"
          value={number}
          handleChange={(e) => setNumber(e.target.value)}
        />
        <FormInput
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={neighborhood}
          handleChange={(e) => setNeighborhood(e.target.value)}
        />
        <FormInput
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={city}
          handleChange={(e) => setCity(e.target.value)}
        />
        <CustomButton name="Cadastrar" onClick={() => handleOnSubmmit} />
        {serverError ? <p className="login-error">{serverError}</p> : null}
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchCreatePartner: (
    user,
    name,
    category,
    address,
    phone,
    website,
    hours,
    payment_methods,
    image,
    onSuccess,
    onError
  ) =>
    dispatch(
      createPartner({
        user,
        name,
        category,
        address,
        phone,
        website,
        hours,
        payment_methods,
        image,
        onSuccess,
        onError,
      })
    ),
  dispatchGetPartnerByUser: (userId) => dispatch(getPartnerByUser(userId)),
});

const mapStateToProps = (state) => ({
  user: state.user,
  uploadImage: state.uploadImage,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateStoreComponent);
