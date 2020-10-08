import * as constants from '../constants';

export const addCoupon = (discontId, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/addCoupon/${discontId}`,
    success: (response) => addedCoupon(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const deleteCoupon = (discontId, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/removeCoupon/${discontId}`,
    success: (response) => deletedCoupon(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

const addedCoupon = (data) => ({
  type: constants.ADD_COUPON,
  payload: data.data.user.coupon,
});

const deletedCoupon = (data) => ({
  type: constants.DELETE_COUPON,
  payload: data.data.user.coupon,
});
