import { createSelector } from 'reselect';

const selectPartners = (state) => state.partner;

export const selectPartnersByCategory = createSelector(
  [selectPartners],
  (partner) => partner.partner
);

export const selectPartnerDetail = createSelector(
  [selectPartners],
  (partner) => partner.data
);
