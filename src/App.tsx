import React from 'react';
import './App.scss';
import ShoppingCart from './components/ShoppingCart/ShoppingCart';
import Product from './components/ProductsList/Product';
import { useState } from 'react';
import { ProductDetail } from './components/ProductDetail/ProductDetail';

export default function App() {
  const initialItemsMock: Product[] = [
    {
      cover: '',
      title: 'MockTitle',
      id: 2,
      category: 'MockCategory',
      description: 'blabla',
      price: 20.5,
      rating: {
        rate: 4.1,
        count: 200,
      },
      quantity: 1,
    },
    {
      cover: '',
      title: 'MockTitle22',
      id: 30,
      category: 'MockCategory22',
      description: 'blabla22',
      price: 40.5,
      rating: {
        rate: 4.6,
        count: 300,
      },
      quantity: 1,
    },
  ];

  const [items, setItems] = useState(initialItemsMock);
  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);

  /*
  return (
    <div>
      <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
    </div>
  );
  */

  return <ProductDetail />;
}
