import * as constants from '../../constants';

export default function addfavorite(state = {}, action) {
  switch (action.type) {
    case constants.USER_SUBSCRIPTION_CARD:
      return { ...action.payload };
    case constants.IUGU_PAYMENT_METHOD:
      return { ...action.payload };
    default:
      return state;
  }
}
