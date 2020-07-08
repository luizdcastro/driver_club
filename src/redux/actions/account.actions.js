import * as constants from '../constants';

export const updateUser = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: '/users/updateMe',
    data,
    success: (response) => setUserInfo(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

const setUserInfo = (data) => ({
  type: constants.ADD_COUPON,
  payload: data.data.user,
});
