import * as constants from '../../constants';

export default function addfavorite(state = [], action) {
  switch (action.type) {
    case constants.ADD_FAVORITE:
      return { ...action.payload };
    case constants.DELETE_FAVORITE:
      return { ...action.payload };
    default:
      return state;
  }
}
