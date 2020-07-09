import * as constants from '../../constants';

export default function createIugoClientReducer(state = '', action) {
  switch (action.type) {
    case constants.CREATE_IUGO_CLIENT:
      return action.payload;
    default:
      return state;
  }
}
