import * as constants from '../constants';

export const createIugoClient = (data, onSuccess, onError) => ({
  type: constants.IUGO_API,
  payload: {
    method: 'POST',
    url: '/customers',
    data,
    success: (response) => getIugoId(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const getIugoId = (data) => ({
  type: constants.CREATE_IUGO_CLIENT,
  payload: data,
});
