import * as constants from "../../constants";

export default function partnerReducer(state = [], action) {
	switch (action.type) {
		case constants.FETCH_PARTNERS_BY_CATEGORY:
			return action.payload;
		case constants.FETCH_PARTNER_DETAIL:
			return action.payload;
		case constants.CREATE_PARTNER:
			return action.payload;
		case constants.EDIT_PARTNER:
			return action.payload;
		case constants.GET_PARTNER_BY_USER:
			return action.payload;
		default:
			return state;
	}
}
