import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../components/header/herder.component';
import Login from '../pages/login/login.page';
import Register from '../pages/register/register.page';
import Home from '../pages/home/home.page';
import DriverPanel from '../pages/driver-panel/driver-panel.page';
import Partners from '../pages/partners/partners.page';
import PartnerDetails from '../pages/partner-details/partner-details.component';

import { logoutUser } from '../redux/actions/auth.actions';

const App = ({ user, dispatchLogoutAction }) => {
  return (
    <React.Fragment>
      <Header
        isLoggedIn={user.isLoggedIn}
        userName={user.name}
        onLogout={dispatchLogoutAction}
      />
      <div>
        {!user.isLoggedIn ? (
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/categories" component={DriverPanel} />
            <Route exact path="/categories/:categoryId" component={Partners} />
            <Route
              exact
              path="/partner/:partnerId"
              component={PartnerDetails}
            />
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
