import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import MaskedInput from 'react-text-mask';

import { getPartnerByUser } from '../../redux/actions/partner.actions';
import { createPartner } from '../../redux/actions/partner.actions';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import UploadImage from '../upload-image/upload-image.component';
import './create-store.component.styles.css';
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
  const [modal, setModal] = useState(false);
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
      () => {
        setCreated(true);
        setModal(true);
      },
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

  const modalCreated = () => {
    return (
      <div className="modal-partner__created">
        <div className="modal-partner__content">
          <h3 className="modal-partner__title">
            Estabelecimento criado com sucesso!
          </h3>
          <Link
            className="modal-partner__button"
            to="/partner-stores"
            onClick={() => setCreated(false)}
          >
            Visualizar
          </Link>
          <Link
            className="modal-partner__button"
            onClick={() => setCreated(false)}
            to="/create-store"
          >
            Adicionar novo
          </Link>
        </div>
      </div>
    );
  };

  return (
    <div className="create-partner__container">
      {modal && modalCreated()}
      <form className="create-partner__form" onSubmit={handleOnSubmmit}>
        <h2 className="create-partner__title">
          Adicionar novo estabelecimento
        </h2>
        <label className="create-partner__label">Nome do negócio</label>
        <FormInput
          id="create-partner__input-form"
          type="text"
          name="name"
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
        <label className="create-partner__label">Telefone comercial</label>
        <MaskedInput
          id="create-partner__input-form"
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
          placeholderChar={'\u2000'}
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <label className="create-partner__label">Website </label>

        <FormInput
          id="create-partner__input-form"
          type="text"
          name="site"
          value={website}
          handleChange={(e) => setWebsite(e.target.value)}
        />
        <label className="create-partner__label">
          Categoria do estabelecimento
        </label>

        <select
          className="create-partner__select-category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="" disabled selected hidden>
            Selecione uma categoria
          </option>
          <option value="postos">Postos</option>
          <option value="locadoras">Locadoras</option>
          <option value="seguros">Seguros</option>
          <option value="alimentação">Alimentação</option>
          <option value="manutenção">Manutenção</option>
          <option value="lava-car">Lava-car</option>
          <option value="lazer">Lazer</option>
        </select>
        <label className="create-partner__label">Horário de atendimento</label>

        <div className="create-partner__time-container">
          <MaskedInput
            className="form-input"
            id="create-partner__input-time"
            placeholder="00:00"
            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            value={open_at}
            onChange={(e) => setOpen_at(e.target.value)}
          />
          <span style={{ fontSize: 14 }}>às</span>
          <MaskedInput
            placeholder="00:00"
            className="form-input"
            id="create-partner__input-time"
            mask={[/\d/, /\d/, ':', /\d/, /\d/]}
            placeholderChar={'\u2000'}
            value={close_at}
            onChange={(e) => setClose_at(e.target.value)}
          />
        </div>
        <label className="create-partner__label">Métodos de pagamento </label>
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
        <label className="create-partner__label">
          Imagem do estabelecimento
        </label>
        <div className="create-partner__image">
          <UploadImage imageUrl />
        </div>
        <label className="create-partner__label">Endereço comercial</label>

        <FormInput
          id="create-partner__input-form"
          type="text"
          name="rua"
          placeholder="Rua"
          value={street}
          handleChange={(e) => setStreet(e.target.value)}
        />
        <FormInput
          id="create-partner__input-form"
          type="text"
          name="numero"
          placeholder="Número"
          value={number}
          handleChange={(e) => setNumber(e.target.value)}
        />
        <FormInput
          id="create-partner__input-form"
          type="text"
          name="bairro"
          placeholder="Bairro"
          value={neighborhood}
          handleChange={(e) => setNeighborhood(e.target.value)}
        />
        <FormInput
          id="create-partner__input-form"
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={city}
          handleChange={(e) => setCity(e.target.value)}
        />
        <CustomButton
          id="create-partner__button"
          name="Cadastrar"
          onClick={() => handleOnSubmmit}
        />

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
      createPartner(
        {
          user,
          name,
          category,
          address,
          phone,
          website,
          hours,
          payment_methods,
          image,
        },
        onSuccess,
        onError
      )
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
