import * as constants from '../constants';

export const updateUser = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: '/users/updateMe',
    data,
    success: (response) => updatedUserInfo(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

const updatedUserInfo = (data) => ({
  type: constants.UPDATE_USER_INFO,
  payload: data.data.user,
});
