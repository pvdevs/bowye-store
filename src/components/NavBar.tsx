import React, { useState } from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';

type TotalItems = {
  totalItems: number;
};

export const NavBar = ({ totalItems }: TotalItems) => {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  const handleLinkButton = () => {
    if (mobileNavActive === false) {
      return;
    }
    setMobileNavActive(() => false);
  };

  const handleToggleButton = () => {
    setMobileNavActive((prev) => !prev);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to={'home'}>
          <img src="/assets/Logo.svg"></img>
        </Link>
      </div>

      <div className="toggle-button" onClick={handleToggleButton}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <div className={`navbar-links ${mobileNavActive ? 'mobile-show' : ''}`}>
        <ul onClick={handleLinkButton}>
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
    <li className={isActive ? 'active' : ''} style={{ listStyle: 'none' }}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
