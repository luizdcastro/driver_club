import React from 'react';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

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
    <div className="subscription-plan__container">
      <h3 className="subscription-plan__title">Rocketcab Basic Plan</h3>
      <h4 className="subsctiption-plan__price">R$ 14,90 / Mensal</h4>
      <ul className="subscription-plan__description">
        <li>
          <CheckIcon style={{ color: green[500] }} /> Descontos ilimitados
        </li>
        <li>
          <CheckIcon style={{ color: green[500] }} />
          Acesso a toda a rede de parceiros
        </li>
        <li>
          <CheckIcon style={{ color: green[500] }} />
          Média de economia por mês R$ 240,00
        </li>
      </ul>
      <CustomButtom
        id="create-subscription__button"
        name="Assinar Plano"
        onClick={createSubscription}
      />
      <CustomButtom
        id="cancel-subscription__button"
        name="Cancelar Assinatura"
        onClick={cancelSubscription}
      />
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
