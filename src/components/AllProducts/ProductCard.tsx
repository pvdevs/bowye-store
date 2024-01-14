import React from 'react';
import './ProductCard.scss';
import Product from '../ProductsList/Product';

interface ProductCard {
  product: Product;
}

export const ProductCard = ({ product }: ProductCard) => {
  return (
    <div className="product-card">
      <img src={product.image} alt="" />
      <div className="product-card-infos">
        <span>{product.title}</span>
        <div>
          <span>{product.category}</span>
          <span>{product.price}</span>
        </div>
      </div>
    </div>
  );
};
