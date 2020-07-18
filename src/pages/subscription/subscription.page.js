import React from 'react';

import PaymentForm from '../../components/payment-form/payment-form.component';
import SubscriptionPlan from '../../components/subscription-plan/subscription-plan.component';
import './subscription.styles.css';

const Subscription = () => {
  return (
    <div>
      <h2>Assinatura</h2>
      <PaymentForm />
      <SubscriptionPlan />
    </div>
  );
};

export default Subscription;
