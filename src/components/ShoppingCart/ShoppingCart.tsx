import React from 'react';
import Product from '../ProductsList/Product';

interface ShoppingCartProps {
  items: Product[];
}

export default function ShoppingCart({ items }: ShoppingCartProps) {
  return <div>ShoppingCart</div>;
}
