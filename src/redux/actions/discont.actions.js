import * as constants from '../constants';

export const createCoupon = (data, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'POST',
    url: '/disconts',
    data,
    success: (response) => createdCoupon(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const editCoupon = (data, couponId, onSuccess, onError) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/disconts/${couponId}`,
    data,
    success: (response) => editedCoupon(response),
    postProccessSuccess: onSuccess,
    postProccessError: onError,
  },
});

export const getCoupon = (couponId) => ({
  type: constants.API,
  payload: {
    method: 'GET',
    url: `/disconts/${couponId}`,
    success: (response) => fetchCoupon(response),
  },
});

const createdCoupon = (data) => ({
  type: constants.CREATE_COUPON,
  payload: data,
});

const editedCoupon = (data) => ({
  type: constants.EDIT_COUPON,
  payload: data,
});

const fetchCoupon = (data) => ({
  type: constants.GET_COUPON,
  payload: data,
});
