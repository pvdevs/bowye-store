import React from 'react';
import { Link } from 'react-router-dom';

export const NavBar = () => {
  return (
    <nav className="nav-b">
      <div className="logo">BADBAD</div>

      <ul className="nav-links">
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="shop">Shop</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="cart">Cart</Link>
        </li>
      </ul>
    </nav>
  );
};
