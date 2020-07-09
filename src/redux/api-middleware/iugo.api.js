import axios from 'axios';

import * as constants from '../constants';

export const apiIugoMiddleware = ({ dispatch }) => (next) => (action) => {
  if (action.type !== constants.IUGO_API) return next(action);

  const BASE_URL = 'https://api.iugu.com/v1';

  const {
    url,
    method,
    success,
    data,
    postProccessSuccess,
    postProccessError,
  } = action.payload;

  axios({
    method,
    url: BASE_URL + url,
    data: data ? data : null,
    headers: {
      authorization:
        'Basic MmM1YjM3ODE4ZjE4YzlmYjY3YmQwNDcyOGI2ZDUxNTY6OTEyNTEwODZ3Nw',
    },
  })
    .then((response) => {
      if (success) dispatch(success(response.data));
      if (postProccessSuccess) postProccessSuccess(response.data);
    })
    .catch((err) => {
      if (!err.response) console.log(err);
      else {
        if (err.response.data.message) {
          if (postProccessError) postProccessError(err.response.data.message);
        }
      }
    });
};
