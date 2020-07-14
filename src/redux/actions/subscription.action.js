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

const cardDetails = (data) => ({
  type: constants.USER_SUBSCRIPTION_CARD,
  payload: data,
});
