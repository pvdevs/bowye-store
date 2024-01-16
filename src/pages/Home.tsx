import React from 'react';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <img src="" alt="" />
      </div>
      <Link to="/shop">
        <button className="cta">Checkout for our products</button>
      </Link>
    </div>
  );
};
