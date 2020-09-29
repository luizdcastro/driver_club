import { createSelector } from 'reselect';

const selectDiscont = (state) => state.discont;

export const selelectDiscontDaya = createSelector(
  [selectDiscont],
  (discont) => discont
);
