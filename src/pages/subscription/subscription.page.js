import React from 'react';
import { connect } from 'react-redux';

import PaymentForm from '../../components/payment-form/payment-form.component';
import SubscriptionPlan from '../../components/subscription-plan/subscription-plan.component';
import CreditCard from '../../components/credit-card/credit-card.component';
import './subscription.styles.css';

const Subscription = ({ getme }) => {
  return (
    <div className="subscription-page__container">
      <h2 className="subscription-page__title">Assinatura</h2>
      <h3 className="subscription-page__subtitle">Métodos de pagamento</h3>
      {getme[0].iugu_card_data ? <CreditCard /> : <PaymentForm />}
      <h3 className="subscription-page__subtitle">Selecione seu Plano</h3>
      <SubscriptionPlan />
      <h3 className="subscription-page__subtitle">Gerenciar Assinatura</h3>
      {getme[0].subscription == false ? (
        <p>Você não possui assinaturas ativas</p>
      ) : (
        <p>Minha Assinatura</p>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

export default connect(mapStateToProps)(Subscription);
