import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import FavoriteCounter from '../favorite-counter/favorite-counter.component';
import CouponCounter from '../../components/coupon-counter/coupon-counter.component';
import MenuIcon from '@material-ui/icons/Menu';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import SubscriptionsIcon from '@material-ui/icons/Subscriptions';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import AssessmentIcon from '@material-ui/icons/Assessment';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

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

  function NavItem({ name, favoriteCounter, couponCounter, children, to }) {
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
        <div className="nav-fav__counter">
          {favoriteCounter}
          {couponCounter}
        </div>
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
        <DropdownItem to="/account">
          <AccountBoxIcon className="menu-dropdown__icon" />
          Perfil
        </DropdownItem>
        <DropdownItem to="/subscription">
          <SubscriptionsIcon className="menu-dropdown__icon" />
          Assinatura
        </DropdownItem>
        <DropdownItem to="/calculator">
          <AssessmentIcon className="menu-dropdown__icon" />
          Calculadora
        </DropdownItem>
        <DropdownItem onClick={onLogout}>
          <ExitToAppIcon className="menu-dropdown__icon" />
          Sair
        </DropdownItem>
      </div>
    );
  }

  return (
    <div className="header">
      <Navbar>
        {isLoggedIn ? (
          <React.Fragment>
            <NavItem
              name={<FavoriteIcon style={{ fontSize: 20 }} />}
              favoriteCounter={<FavoriteCounter />}
              to="/favorites"
            />
            <NavItem
              name={<LoyaltyIcon style={{ fontSize: 20 }} />}
              couponCounter={<CouponCounter />}
              to="/coupons"
            />
            <NavItem name={<MenuIcon style={{ fontSize: 20 }} />}>
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
