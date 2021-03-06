import * as constants from "../constants";

export const createPartner = (data, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "POST",
		url: "/partners",
		data,
		success: (response) => createdPartner(response),
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const editPartner = (data, partnerId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "PATCH",
		url: `/partners/${partnerId}`,
		data,
		success: (response) => editedPartner(response),
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const getPartnerByUser = (userId) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `/partners?user=${userId}`,
		success: (response) => fetchPartnersByUser(response),
	},
});

export const deletePartner = (partnerId, onSuccess, onError) => ({
	type: constants.API,
	payload: {
		method: "DELETE",
		url: `/partners/${partnerId}`,
		success: (response) => deletedPartner(response),
		postProccessSuccess: onSuccess,
		postProccessError: onError,
	},
});

export const fetchPartnersByCategory = (categoryId) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `/partners?category=${categoryId}`,
		success: (response) => fetchPartners(response),
	},
});

export const fetchPartnerDetails = (partnerId) => ({
	type: constants.API,
	payload: {
		method: "GET",
		url: `/partners/${partnerId}`,
		success: (response) => fetchOnePartner(response),
	},
});

const createdPartner = (data) => ({
	type: constants.CREATE_PARTNER,
	payload: data,
});

const editedPartner = (data) => ({
	type: constants.EDIT_PARTNER,
	payload: data,
});

const deletedPartner = (data) => ({
	type: constants.DELETE_PARTNER,
	payload: data,
});

const fetchPartnersByUser = (data) => ({
	type: constants.GET_PARTNER_BY_USER,
	payload: data,
});

const fetchPartners = (data) => ({
	type: constants.FETCH_PARTNERS_BY_CATEGORY,
	payload: data,
});

const fetchOnePartner = (data) => ({
	type: constants.FETCH_PARTNER_DETAIL,
	payload: data,
});
