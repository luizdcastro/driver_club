import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckIcon from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';

import { getMe } from '../../redux/actions/getme.action';
import {
  createSubscription,
  cancelSubscription,
} from '../../redux/actions/subscription.action';
import PaymentForm from '../payment-form/payment-form.component';
import CreditCard from '../credit-card/credit-card.component';
import CustomButtom from '../custom-button/custom-button.component';
import './subscription-plan.styles.css';

const SubscriptionPlan = ({
  getme,
  dispatchGetme,
  dispatchCreateSubscription,
  dispatchCancelSubscription,
}) => {
  const [subscription, setSubscription] = useState({});

  useEffect(() => dispatchGetme(), [dispatchGetme, subscription]);

  useEffect(() => setSubscription(getme[0].subscription), [dispatchGetme]);

  const createSubscription = (event) => {
    event.preventDefault();
    if (!getme[0].iugu_card_data) {
      alert('Adicione um método de pagamento');
    } else {
      dispatchCreateSubscription(
        getme[0].id,
        () => {
          console.log('Assinatura criada com sucesso');
          setSubscription(true);
        },
        () => console.log('Erro ao processar o pedido, tente novamente.')
      );

      dispatchGetme();
    }
  };
  const cancelSubscription = (event) => {
    event.preventDefault();
    dispatchCancelSubscription(getme[0].id);
    setSubscription(false);
    dispatchGetme();
  };
  return (
    <div>
      <div className="subscription-subtitle__container">
        <h3>Métodos de Pagamento</h3>
      </div>
      {getme[0].iugu_card_data ? <CreditCard /> : <PaymentForm />}
      <div className="subscription-subtitle__container">
        <h3>Selecione seu Plano</h3>
      </div>
      <div className="subscription-plan__container">
        <form onSubmit={createSubscription}>
          <h3 className="subscription-plan__title">Rocketcab Basic Plan</h3>
          <h4 className="subsctiption-plan__price">R$ 14,90 / Mensal</h4>
          <div className="subscription-plan__description">
            <ul>
              <li className="description-item">
                <CheckIcon
                  className="check-icon"
                  style={{ color: green[500] }}
                />{' '}
                <p>Descontos ilimitados</p>
              </li>
              <li className="description-item">
                <CheckIcon
                  className="check-icon"
                  style={{ color: green[500] }}
                />
                <p>Acesso a toda a rede de parceiros</p>
              </li>
              <li className="description-item">
                <CheckIcon
                  className="check-icon"
                  style={{ color: green[500] }}
                />
                <p>Média de economia por mês R$ 240,00</p>
              </li>
            </ul>
          </div>
          {subscription === false ? (
            <CustomButtom
              id="create-subscription__button"
              name="Assinar Plano"
              onClick={createSubscription}
            />
          ) : (
            <p className="subscription-plan__active">Plano Ativo</p>
          )}
        </form>
      </div>

      <div className="subscription-subtitle__container">
        <h3>Gerenciar Assinatura</h3>
      </div>
      {subscription === false ? (
        <div className="subscription-container__inative">
          <p>Você não possui assinaturas ativas</p>
        </div>
      ) : (
        <div className="subscription-page__active">
          <p className="subscription-active__content">Valor: 14,90</p>
          <p className="subscription-active__content">Periodicidade: Mensal</p>
          <p className="subscription-active__content">Status: Ativa</p>
          <Link
            className="subscription-active__cancel"
            onClick={cancelSubscription}
          >
            Cancelar Assinatura
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetme: () => dispatch(getMe()),
  dispatchCancelSubscription: (id, onSuccess, onError) =>
    dispatch(cancelSubscription({ id }, onSuccess, onError)),
  dispatchCreateSubscription: (id) => dispatch(createSubscription({ id })),
});

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionPlan);
