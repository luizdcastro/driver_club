import React from 'react';
import { Link } from 'react-router-dom';

import './header.styles.css';

const Header = ({ userName, isLoggedIn, onLogout }) => {
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
            <p>Olá {userName}</p>
            <button onClick={onLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
