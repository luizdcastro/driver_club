import React, { useState } from 'react';
import { connect } from 'react-redux';

import {
  addCard,
  createPaymentMethod,
} from '../../redux/actions/subscription.action';
import { getMe } from '../../redux/actions/getme.action';
import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

const PaymentForm = ({
  dispatchAddcard,
  dispatchCreatePaymentMehod,
  dispatchGetMe,
  getme,
}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [ccvCode, setCcvCode] = useState('');

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
        console.log(data.extra_info);
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
          dispatchGetMe();
        }
      }
    });
  };

  return (
    <div>
      <h3>Payment Data</h3>
      <form onSubmit={handleSubmit}>
        <FormInput
          placeholder="Número do Cartão"
          handleChange={(e) => setCardNumber(e.target.value)}
          value={cardNumber}
        />
        <FormInput
          placeholder="Nome"
          handleChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <FormInput
          placeholder="Sobrenome"
          handleChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <FormInput
          placeholder="Mês"
          handleChange={(e) => setMonth(e.target.value)}
          value={month}
        />
        <FormInput
          placeholder="Ano"
          handleChange={(e) => setYear(e.target.value)}
          value={year}
        />
        <FormInput
          placeholder="CCV"
          handleChange={(e) => setCcvCode(e.target.value)}
          value={ccvCode}
        />
        <CustomButton
          name="Adicionar Método de Pagamento"
          onClick={handleSubmit}
        />
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMe: () => dispatch(getMe()),
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
