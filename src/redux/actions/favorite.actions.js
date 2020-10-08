import * as constants from '../constants';

export const addFavorite = (partnerId, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/addFavorite/${partnerId}`,
    success: (response) => addedFavorite(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const deleteFavorite = (partnerId, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/removeFavorite/${partnerId}`,
    success: (response) => deletedFavorite(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

const addedFavorite = (data) => ({
  type: constants.ADD_FAVORITE,
  payload: data.data.user.favorite,
});

const deletedFavorite = (data) => ({
  type: constants.DELETE_FAVORITE,
  payload: data.data.user.favorite,
});
