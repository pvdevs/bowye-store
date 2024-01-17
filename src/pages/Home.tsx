import React from 'react';
import { Link } from 'react-router-dom';
import './styles/Home.scss';

export const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <img
          src="https://media.gq-magazine.co.uk/photos/6513fc12401a20d55139ab8b/16:9/w_2560%2Cc_limit/best-clothing-brands-for-men.jpg"
          alt=""
        />
      </div>
      <Link to="/shop">
        <button className="cta-button">Checkout for our products</button>
      </Link>
    </div>
  );
};
