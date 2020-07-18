import React from 'react';
import { connect } from 'react-redux';

import {
  createSubscription,
  cancelSubscription,
} from '../../redux/actions/subscription.action';
import CustomButtom from '../custom-button/custom-button.component';
import './subscription-plan.styles.css';

const SubscriptionPlan = ({
  getme,
  dispatchCreateSubscription,
  dispatchCancelSubscription,
}) => {
  const createSubscription = (event) => {
    event.preventDefault();
    dispatchCreateSubscription(getme[0].id);
  };
  const cancelSubscription = (event) => {
    event.preventDefault();
    dispatchCancelSubscription(getme[0].id);
  };

  return (
    <div>
      <h3>Selecione seu plano</h3>
      <p>Rocketcab Basic</p>
      <p>R$ 14,90 / Mensal</p>
      <CustomButtom name="Assinar Plano" onClick={createSubscription} />
      <CustomButtom name="Cancelar Assinatura" onClick={cancelSubscription} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchCreateSubscription: (id) => dispatch(createSubscription({ id })),
  dispatchCancelSubscription: (id) => dispatch(cancelSubscription({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlan);
