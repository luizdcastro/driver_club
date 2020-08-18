import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/header/herder.component';
import Login from '../pages/login/login.page';
import Register from '../pages/register/register.page';
import Home from '../pages/home/home.page';
import Categories from '../pages/categories/category.page';
import Partners from '../pages/partners/partners.page';
import PartnerDetails from '../pages/partner-details/partner-details.page';
import Coupons from '../pages/coupons/coupons.page';
import Favorites from '../pages/favorites/favorites.page';
import Account from '../pages/account/account.page';
import Subscription from '../pages/subscription/subscription.page';
import ForgotPassword from '../pages/forgot-password/forgot-password.page';
import ResetPassword from '../pages/reset-password/reset-password.page';
import Calculator from '../pages/calculator/calculator.page';

import { logoutUser } from '../redux/actions/auth.actions';

const App = ({ user, dispatchLogoutAction }) => {
  return (
    <React.Fragment>
      <Header
        isLoggedIn={user.isLoggedIn}
        userName={user.name}
        onLogout={dispatchLogoutAction}
      />
      <div className="App">
        {!user.isLoggedIn ? (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route
              exact
              path="/reset-password/:token"
              component={ResetPassword}
            />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/categories" component={Categories} />
            <Route exact path="/categories/:categoryId" component={Partners} />
            <Route
              exact
              path="/partner/:partnerId"
              component={PartnerDetails}
            />
            <Route exact path="/coupons" component={Coupons} />
            <Route exact path="/favorites" component={Favorites} />
            <Route exact path="/account" component={Account} />
            <Route exact path="/subscription" component={Subscription} />
            <Route exact path="/calculator" component={Calculator} />

            <Redirect to="/categories" />
          </Switch>
        )}
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = (dispatch) => ({
  dispatchLogoutAction: () => dispatch(logoutUser()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
