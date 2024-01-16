import React from 'react';
import ProductsList from '../components/ProductsList/ProductsList';
import ShoppingCart from '../components/ShoppingCart/ShoppingCart';

export const Cart = ({ items, setItems, totalItems }: ProductsList) => {
  return (
    <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
  );
};
