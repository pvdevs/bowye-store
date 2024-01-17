import React, { useState } from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';

type TotalItems = {
  totalItems: number;
};

export const NavBar = ({ totalItems }: TotalItems) => {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const handleToggleButton = () => {
    setMobileNavActive((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">BADBAD</div>
      <a href="#" className="toggle-button" onClick={handleToggleButton}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </a>
      <div className={`navbar-links ${mobileNavActive ? 'mobile-show' : ''}`}>
        <ul>
          <CustomLink to={'home'}>HOME</CustomLink>
          <CustomLink to={'shop'}>SHOP</CustomLink>
          <CustomLink to={'cart'}>CART({totalItems})</CustomLink>
        </ul>
      </div>
    </nav>
  );
};

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });

  return (
    <li className={isActive ? 'active' : ''}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
