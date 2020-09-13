import * as constants from '../../constants';

export default function subscriptionReducer(state = {}, action) {
  switch (action.type) {
    case constants.IUGU_CARD_DATA:
      return { ...action.payload };
    case constants.IUGU_REMOVE_CARD:
      return { ...action.payload };
    case constants.IUGU_PAYMENT_METHOD:
      return { ...action.payload };
    case constants.IUGU_SUBSCRIPTION:
      return { ...action.payload };
    case constants.IUGU_CANCEL_SUBSCRIPTION:
      return { ...action.payload };
    default:
      return state;
  }
}
