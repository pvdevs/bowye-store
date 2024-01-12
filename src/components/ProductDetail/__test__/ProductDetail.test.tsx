import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ShoppingCart from '../ShoppingCart';
import Product from '../../ProductsList/Product';
import { useState } from 'react';

const MockSingleProduct: Product[] = [
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
];

const MockMultipleProducts: Product[] = [
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

const MockCartSingle = () => {
  const [items, setItems] = useState(MockSingleProduct);
  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);
  return (
    <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
  );
};

const MockEmptyCart = () => {
  const [items, setItems] = useState<Product[]>([] as Product[]);
  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);
};

const MockCartMultiple = () => {
  const [items, setItems] = useState(MockMultipleProducts);
  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
  );
};
