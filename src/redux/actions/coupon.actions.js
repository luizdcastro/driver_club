import * as constants from '../constants';

export const addCoupon = (discontId) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/addCoupon/${discontId}`,
    success: (response) => addedCoupon(response),
  },
});

export const deleteCoupon = (discontId) => ({
  type: constants.API,
  payload: {
    method: 'PATCH',
    url: `/users/removeCoupon/${discontId}`,
    success: (response) => deletedCoupon(response),
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
