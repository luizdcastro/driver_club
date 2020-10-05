import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import MaskedInput from 'react-text-mask';

import {
  addCard,
  createPaymentMethod,
} from '../../redux/actions/subscription.action';
import { getMe } from '../../redux/actions/getme.action';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
import './payment-form.styles.css';

const PaymentForm = ({
  dispatchAddcard,
  dispatchCreatePaymentMehod,
  dispatchGetMeAction,
  getme,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ccvCode, setCcvCode] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [cardError, setCardError] = useState('');

  useEffect(() => dispatchGetMeAction, [dispatchGetMeAction]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const accountId = 'A4A963C54F4F46F9A9ECE117B335BD3D';
    window.Iugu.setAccountID(accountId);
    window.Iugu.setTestMode(true);
    const data = window.Iugu.CreditCard(
      cardNumber,
      month,
      year,
      firstName,
      lastName,
      ccvCode
    );
    window.Iugu.createPaymentToken(data, async function (response) {
      if (response.errors) {
        setCardError('Erro ao salvar o cartão, verifique os dados inseridos.');
        console.log('Erro salvando cartão:' + JSON.stringify(response.errors));
      } else {
        const data = await response;
        if (response) {
          dispatchAddcard(
            data.id,
            data.extra_info.brand,
            data.extra_info.display_number,
            data.extra_info.holder_name,
            data.extra_info.month,
            data.extra_info.year
          );
          dispatchCreatePaymentMehod(getme[0].id);
          setModalVisible(false);
          dispatchGetMeAction();
        }
      }
      dispatchGetMeAction();
    });
  };

  return (
    <div>
      {!modalVisible ? (
        <div
          className="payment-method__container"
          onSubmit={() => setModalVisible(true)}
        >
          <Link
            className="custom-button"
            id="payment-method__addbtn"
            onClick={() => {
              setModalVisible(true);
            }}
          >
            Adicionar Cartão
          </Link>
        </div>
      ) : (
        <div className="modal-payment__container">
          <form className="modal-payment__content" onSubmit={handleSubmit}>
            <div className="credit-card__group">
              <CloseIcon
                className="modal-payment__icon"
                style={{ fontSize: 30 }}
                onClick={() => {
                  setModalVisible(false);
                  setCardError('');
                }}
              />
              <h4 className="modal-payment__title">
                Adicionar Médodo de Pagamento
              </h4>
              <label className="credit-card__label">Número do cartão</label>
              <MaskedInput
                id="modal-payment__card"
                className="form-input"
                mask={[
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                  ' ',
                  /\d/,
                  /\d/,
                  /\d/,
                  /\d/,
                ]}
                placeholderChar={'\u2000'}
                onChange={(e) => setCardNumber(e.target.value)}
                value={cardNumber}
              />
              <div className="credit-card__flex">
                <div>
                  <label className="credit-card__label">Nome</label>
                  <FormInput
                    id="modal-payment__firstName"
                    className="form-input"
                    type="text"
                    handleChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                  />
                </div>
                <div>
                  <label className="credit-card__label">Sobrenome</label>
                  <FormInput
                    id="modal-payment__firstName"
                    className="form-input"
                    type="text"
                    handleChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                  />
                </div>
              </div>
              <div className="credit-card__flex">
                <div>
                  <label className="credit-card__label">Mês</label>
                  <MaskedInput
                    id="modal-payment__month"
                    className="form-input"
                    mask={[/\d/, /\d/]}
                    placeholderChar={'\u2000'}
                    onChange={(e) => setMonth(e.target.value)}
                    value={month}
                  />
                </div>
                <div>
                  <label className="credit-card__label">Ano</label>{' '}
                  <MaskedInput
                    id="modal-payment__year"
                    className="form-input"
                    mask={[/\d/, /\d/, /\d/, /\d/]}
                    placeholderChar={'\u2000'}
                    onChange={(e) => setYear(e.target.value)}
                    value={year}
                  />
                </div>
                <div>
                  <label className="credit-card__label">CCV</label>{' '}
                  <MaskedInput
                    id="modal-payment__cvv"
                    className="form-input"
                    mask={[/\d/, /\d/, /\d/]}
                    placeholderChar={'\u2000'}
                    onChange={(e) => setCcvCode(e.target.value)}
                    value={ccvCode}
                  />
                </div>
              </div>
              <div className="credit-card__flex">
                <CustomButton
                  id="modal-payment__save"
                  name="Salvar"
                  onClick={handleSubmit}
                />
              </div>
              <div className="credit-card__flex">
                <Link
                  className="custom-button"
                  id="modal-payment__cancel"
                  onClick={() => {
                    setModalVisible(false);
                    setCardError('');
                  }}
                >
                  Cancelar
                </Link>
              </div>
              {cardError ? <p className="card-error">{cardError}</p> : null}
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
  dispatchCreatePaymentMehod: (id) => dispatch(createPaymentMethod({ id })),
  dispatchAddcard: (id, brand, number, name, month, year, onSuccess, onError) =>
    dispatch(
      addCard(
        { iugu_card_data: { id, brand, number, name, month, year } },
        onSuccess,
        onError
      )
    ),
});

const mapStateToProps = (state) => ({
  getme: state.getme,
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentForm);
