import * as constants from '../constants';

export const forgotPassword = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/forgotPassword',
    data,
    success: (response) => forgotPasswordResponse(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const resetPassword = (token, data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/resetPassword/${token}`,
    data,
    success: (response) => resetPasswordResponse(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

const forgotPasswordResponse = (data) => ({
  type: constants.FORGOT_PASSWORD,
  payload: data,
});

const resetPasswordResponse = (data) => ({
  type: constants.RESET_PASSWORD,
  payload: data,
});
