import React from 'react';
import './ProductCard.scss';
import Product from '../ProductsList/Product';
import { Link } from 'react-router-dom';

interface ProductCard {
  product: Product;
}

export const ProductCard = ({ product }: ProductCard) => {
  const productId = product.id.toString();

  return (
    <Link to={productId}>
      <div className="product-card">
        <img src={product.image} alt="" />
        <div className="product-card-infos">
          <div className="product-card-infos-title">{product.title}</div>
          <div className="product-card-infos-bottom">
            <span>{product.category}</span>
            <span>${product.price}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
