import * as constants from '../../constants';

export default function addCoupon(state = [], action) {
  switch (action.type) {
    case constants.ADD_COUPON:
      return { ...action.payload };
    case constants.DELETE_COUPON:
      return { ...action.payload };
    default:
      return state;
  }
}
