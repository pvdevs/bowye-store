import React from 'react';
import { Link, useLocation, useMatch, useResolvedPath } from 'react-router-dom';
import './NavBar.scss';

type TotalItems = {
  totalItems: number;
};

export const NavBar = ({ totalItems }: TotalItems) => {
  const location = useLocation();
  return (
    <nav className="nav-bar">
      <div className="logo">BADBAD</div>

      <ul className="nav-links">
        <CustomLink to={'home'}>HOME</CustomLink>
        <CustomLink to={'shop'}>SHOP</CustomLink>
        <CustomLink to={'cart'}>CART({totalItems})</CustomLink>
      </ul>
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
