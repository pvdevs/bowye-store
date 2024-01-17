import React, { useEffect, useState } from 'react';
import './styles/Shop.scss';
import { ProductCard } from '../components/AllProducts/ProductCard';
import { useShopContext } from '../contexts/ShopContext';

export const Shop = () => {
  const { products } = useShopContext();

  return (
    <div className="shop-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
