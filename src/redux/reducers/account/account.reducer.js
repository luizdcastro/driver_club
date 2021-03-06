import * as constants from '../../constants';

export default function accountReducer(state = [], action) {
  switch (action.type) {
    case constants.UPDATE_USER_INFO:
      return { ...action.payload };
    case constants.UPDATE_PASSWORD:
      return { ...action.payload };
    default:
      return state;
  }
}
