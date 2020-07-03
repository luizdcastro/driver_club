import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getMe } from '../../redux/actions/getme.action';
import './header.styles.css';

const Header = ({ getme, isLoggedIn, onLogout, dispatchGetMeAction }) => {
  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction, isLoggedIn]);

  return (
    <div>
      <Link to="/">
        <h2>Logo</h2>
      </Link>
      <div>
        {!isLoggedIn ? (
          <div>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
        ) : (
          <div>
            <p>Olá {getme[0].name.split(' ')[0]} </p>
            <button onClick={onLogout}>Logout</button>
            <Link to="/coupons">Coupons</Link>
            <Link to="/favorites">Favorites</Link>
            <Link to="/account">Account</Link>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  getme: state.getme,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchGetMeAction: () => dispatch(getMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
