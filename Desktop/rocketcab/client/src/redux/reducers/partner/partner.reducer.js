import * as constants from '../../constants';

export default function partnerReducer(state = [], action) {
  switch (action.type) {
    case constants.FETCH_PARTNERS_BY_CATEGORY:
      return action.payload;
    case constants.FETCH_PARTNER_DETAIL:
      return action.payload;
    case constants.RESET_USER_INFO:
    default:
      return state;
  }
}
