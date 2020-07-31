import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';

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
        <div className="payment-method__container">
          <CustomButton
            id="payment-method__addbtn"
            name="Adicionar Cartão"
            onClick={() => setModalVisible(true)}
          />
        </div>
      ) : (
        <div className="modal-payment__container">
          <h3>Adicionar Médodo de Pagamento</h3>
          <form className="modal-payment__content" onSubmit={handleSubmit}>
            <FormInput
              id="modal-payment__card"
              placeholder="Número do Cartão"
              handleChange={(e) => setCardNumber(e.target.value)}
              value={cardNumber}
            />
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
            <CustomButton
              id="modal-payment__save"
              name="Salvar"
              onClick={handleSubmit}
            />
            <CustomButton
              id="modal-payment__cancel"
              name="Cancelar"
              onClick={() => setModalVisible(false)}
            />
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
