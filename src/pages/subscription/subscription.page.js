import React from 'react';

import SubscriptionPlan from '../../components/subscription-plan/subscription-plan.component';
import './subscription.styles.css';

const Subscription = () => {
  return (
    <div className="subscription-page__container">
      <h2 className="subscription-page__title">Assinatura</h2>
      <SubscriptionPlan />
    </div>
  );
};

export default Subscription;
