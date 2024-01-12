import React from 'react';
import './ProductDetail.scss';

export const ProductDetail = () => {
  return (
    <div className="product-details">
      <img src="aasf" alt="" />
      <div className="product-details-infos">
        <div className="details-title-rate">
          <h1>Bababa</h1>
          <span>Rating 3.9 - 250 reviews</span>
        </div>
        <p>
          Slim-fitting style, contrast raglan long sleeve, three-button henley
          placket, light weight & soft fabric for breathable and comfortable
          wearing. And Solid stitched shirts with round neck made for durability
          and a great fit for casual fashion wear and diehard baseball fans. The
          Henley style round neckline includes a three-button placket.
        </p>
        <span>Category</span>
        <div className="horizontal-line"></div>
        <div className="cta">
          <button>Add to your cart - $24</button>
        </div>
      </div>
    </div>
  );
};
