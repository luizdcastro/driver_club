import * as constants from '../constants';

export const registerUser = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/signup',
    data,
    success: (response) => setUserInfo(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const loginUser = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/users/login',
    data,
    success: (response) => setUserInfo(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const logoutUser = () => {
  localStorage.removeItem('user');
  return { type: constants.RESET_USER_INFO };
};

const setUserInfo = (data) => {
  const parsedToken = JSON.parse(atob(data.token.split('.')[1]));
  const userInfo = {
    userId: parsedToken.id,
    token: data.token,
    isLoggedIn: true,
    isPartner: data.data.user.isPartner,
  };
  localStorage.setItem('user', JSON.stringify(userInfo));
  return { type: constants.SET_USER_INFO, payload: userInfo };
};
