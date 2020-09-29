import * as constants from '../../constants';

export default function discontReducer(state = [], action) {
  switch (action.type) {
    case constants.ADD_COUPON:
      return { ...action.payload };
    case constants.EDIT_COUPON:
      return { ...action.payload };
    case constants.GET_COUPON:
      return { ...action.payload };
    default:
      return state;
  }
}
