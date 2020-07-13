import * as constants from '../../constants';

export default function accountSettings(state = [], action) {
  switch (action.type) {
    case constants.UPDATE_USER_INFO:
      return { ...action.payload };
    default:
      return state;
  }
}
