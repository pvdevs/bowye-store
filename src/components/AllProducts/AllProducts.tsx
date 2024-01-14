import React, { useEffect, useState } from 'react';
import './AllProducts.scss';
import { ProductCard } from './ProductCard';

export const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getData() {
      const products = await fetch('https://fakestoreapi.com/products').then(
        (response) => {
          if (response.status >= 400) {
            throw new Error('server error');
          }
          return response.json();
        }
      );
      setProducts(products);
    }

    getData();
  }, []);

  const newProduct: Product = {
    cover: '',
    title: 'MockTitle',
    id: 52,
    category: 'MockCategory',
    description: 'blabla',
    price: 90,
    rating: {
      rate: 4.2,
      count: 240,
    },
    quantity: 1,
  };

  return (
    <div className="shop-container">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
