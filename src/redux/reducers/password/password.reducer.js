import * as constants from '../../constants';

export default function addfavorite(state = {}, action) {
  switch (action.type) {
    case constants.FORGOT_PASSWORD:
      return { ...action.payload };
    case constants.RESET_PASSWORD:
      return { ...action.payload };

    default:
      return state;
  }
}
