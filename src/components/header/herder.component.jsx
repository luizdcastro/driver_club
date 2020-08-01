import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';

import './header.styles.css';

const Header = ({ isLoggedIn, onLogout }) => {
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
        <Link
          className={`nav-link__${isLoggedIn}`}
          onClick={() => setOpen(!open)}
          to={to}
        >
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
        <DropdownItem to="/subscription">Assinatura</DropdownItem>
        <DropdownItem onClick={onLogout}>Logout</DropdownItem>
      </div>
    );
  }

  return (
    <div className="header">
      <Navbar>
        {isLoggedIn ? (
          <React.Fragment>
            <NavItem name={<FavoriteIcon />} to="/favorites" />
            <NavItem name={<LoyaltyIcon />} to="/coupons" />
            <NavItem name={<MenuIcon />}>
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

export default Header;
