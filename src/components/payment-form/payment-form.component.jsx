import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';

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
              <div className="credit-card__flex">
                <FormInput
                  id="modal-payment__card"
                  placeholder="Número do Cartão"
                  handleChange={(e) => setCardNumber(e.target.value)}
                  value={cardNumber}
                />
              </div>
              <div className="credit-card__flex">
                <FormInput
                  id="modal-payment__firstName"
                  placeholder="Nome"
                  handleChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                />
                <FormInput
                  id="modal-payment__lastName"
                  placeholder="Sobrenome"
                  handleChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                />
              </div>
              <div className="credit-card__flex">
                <FormInput
                  id="modal-payment__month"
                  placeholder="Mês"
                  handleChange={(e) => setMonth(e.target.value)}
                  value={month}
                />
                <FormInput
                  id="modal-payment__year"
                  placeholder="Ano"
                  handleChange={(e) => setYear(e.target.value)}
                  value={year}
                />
                <FormInput
                  id="modal-payment__cvv"
                  placeholder="CCV"
                  handleChange={(e) => setCcvCode(e.target.value)}
                  value={ccvCode}
                />
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
