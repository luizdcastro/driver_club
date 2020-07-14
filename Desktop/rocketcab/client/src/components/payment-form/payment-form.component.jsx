import React, { useState, useEffect, createContext } from 'react';
import ScriptTag from 'react-script-tag';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';
const PaymentForm = () => {
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
      '4111111111111111',
      '12',
      '2020',
      'Nome',
      'Sobrenome',
      '444'
    );
    window.Iugu.createPaymentToken(data, function (response) {
      if (response.errors) {
        alert('Erro salvando cartão' + JSON.stringify(response.errors));
      } else {
        alert('Token criado:' + response.id);
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
        <CustomButton name="Adicionar Pagamento" onClick={handleSubmit} />
      </form>
    </div>
  );
};
export default PaymentForm;
