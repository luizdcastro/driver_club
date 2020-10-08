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

export const removeCard = (data) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: '/users/removePaymentMethod',
    data,
    success: (response) => removedCard(response),
  },
});

export const createPaymentMethod = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/createPaymentMethod',
    data,
    success: (response) => paymentMethod(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const createSubscription = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/createSubscription',
    data,
    success: (response) => subscription(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const cancelSubscription = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/cancelSubscription',
    data,
    success: (response) => canceledSubscription(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
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

const removedCard = (data) => ({
  type: constants.IUGU_REMOVE_CARD,
  payload: data,
});
