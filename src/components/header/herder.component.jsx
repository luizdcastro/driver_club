import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getMe } from '../../redux/actions/getme.action';
import './header.styles.css';

const Header = ({ getme, isLoggedIn, onLogout, dispatchGetMeAction }) => {
  useEffect(() => dispatchGetMeAction(), [dispatchGetMeAction, isLoggedIn]);

  function Navbar({ children }) {
    return (
      <nav className="nav-container">
        <Link className="nav-logo" to="/home">
          rocketcab
        </Link>
        <ul className="nav-menu">{children}</ul>
      </nav>
    );
  }

  function NavItem({ name, children, to }) {
    const [open, setOpen] = useState(false);
    return (
      <li className="nav-item">
        <Link className="nav-link" onClick={() => setOpen(!open)} to={to}>
          {name}
        </Link>
        {open && children}
      </li>
    );
  }

  function DropdownMenu() {
    function DropdownItem({ children, to, onClick }) {
      return (
        <Link className="menu-item" to={to} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <div className="menu-dropdown">
        <DropdownItem to="/account">Profile</DropdownItem>
        <DropdownItem to="/account">Assinatura</DropdownItem>
        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
      </div>
    );
  }

  return (
    <div className="header">
      <Navbar>
        {isLoggedIn ? (
          <React.Fragment>
            <NavItem name="Favorites" to="/favorites" />
            <NavItem name="Coupons" to="/coupons" />
            <NavItem name="Menu">
              <DropdownMenu />
            </NavItem>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavItem name="Login" to="/login" />
            <NavItem name="Registrar" to="/register" />
          </React.Fragment>
        )}
      </Navbar>
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
