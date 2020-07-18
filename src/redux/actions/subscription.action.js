import * as constants from '../constants';

export const addCard = (data) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: '/users/updateMe',
    data,
    success: (response) => cardDetails(response),
  },
});

export const createPaymentMethod = (data) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/createPaymentMethod',
    data,
    success: (response) => paymentMethod(response),
  },
});

export const createSubscription = (data) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/createSubscription',
    data,
    success: (response) => subscription(response),
  },
});

export const cancelSubscription = (data) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/cancelSubscription',
    data,
    success: (response) => canceledSubscription(response),
  },
});

const canceledSubscription = (data) => ({
  type: constants.IUGU_CANCEL_SUBSCRIPTION,
  payload: data,
});

const subscription = (data) => ({
  type: constants.IUGU_SUBSCRIPTION,
  payload: data,
});

const paymentMethod = (data) => ({
  type: constants.IUGU_PAYMENT_METHOD,
  payload: data,
});

const cardDetails = (data) => ({
  type: constants.IUGU_CARD_DATA,
  payload: data,
});
