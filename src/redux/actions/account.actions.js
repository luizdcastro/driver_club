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

const setUserInfo = (data) => {
  const parsedToken = JSON.parse(atob(data.token.split('.')[1]));
  const userInfo = {
    userId: parsedToken.id,
    name: data.data.user.name.split(' ')[0],
    token: data.token,
    isLoggedIn: true,
  };
  localStorage.setItem('USER_INFO', JSON.stringify(userInfo));
  return { type: constants.SET_USER_INFO, payload: userInfo };
};
