import { combineReducers } from 'redux';

import user from './user/user.reducer';
import loading from './loading/loading.reducer';
import category from './category/category.reducer';
import partner from './partner/partner.reducer';
import getme from './getme/getme.reducer';
import favorite from './favorite/favorite.reducer';
import coupon from './coupon/coupon.reducer';
import account from './account/account.reducer';
import subscription from './subscription/subscription.reducer';
import password from './password/password.reducer';
import uploadImage from './upload-image/upload-image.reducer';
import discont from './discont/discont.reducer';

const rootReducer = combineReducers({
  user,
  loading,
  category,
  partner,
  getme,
  favorite,
  coupon,
  account,
  subscription,
  password,
  uploadImage,
  discont,
});

export default rootReducer;
