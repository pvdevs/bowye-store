import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="nav-b">
      <div className="logo">BADBAD</div>

      <ul className="nav-links">
        <li>Home</li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <li>About Us</li>
        <li>Cart</li>
      </ul>
    </nav>
  );
};
