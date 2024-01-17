import React, { useEffect, useState } from 'react';
import './styles/Shop.scss';
import { ProductCard } from '../components/AllProducts/ProductCard';

type Product = {
  products: [];
};

export const Shop = ({ products }: Product) => {
  return (
    <div className="shop-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
