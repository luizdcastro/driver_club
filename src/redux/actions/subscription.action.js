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

const paymentMethod = (data) => ({
  type: constants.IUGU_PAYMENT_METHOD,
  payload: data,
});

const cardDetails = (data) => ({
  type: constants.USER_SUBSCRIPTION_CARD,
  payload: data,
});
