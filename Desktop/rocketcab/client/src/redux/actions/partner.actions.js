import * as constants from '../constants';

export const fetchPartnersByCategory = (categoryId) => ({
  type: constants.API,
  payload: {
    method: 'GET',
    url: `/partners?category=${categoryId}`,
    success: (response) => fetchPartners(response),
  },
});

export const fetchPartnerDetails = (partnerId) => ({
  type: constants.API,
  payload: {
    method: 'GET',
    url: `/partners/${partnerId}`,
    success: (response) => fetchOnePartner(response),
  },
});

const fetchPartners = (data) => ({
  type: constants.FETCH_PARTNERS_BY_CATEGORY,
  payload: data,
});

const fetchOnePartner = (data) => ({
  type: constants.FETCH_PARTNER_DETAIL,
  payload: data,
});
