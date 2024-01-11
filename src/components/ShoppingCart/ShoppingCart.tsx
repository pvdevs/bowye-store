import React, { useState } from 'react';
import Product from '../ProductsList/Product';
import './ShoppingCart.scss';
import { v4 as uuid } from 'uuid';
import { CartItem } from './CartItem';

interface ShoppingCartProps {
  items: Product[];
  setItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

export default function ShoppingCart({ items, setItems }: ShoppingCartProps) {
  //

  return (
    <div className="shopping-cart">
      <button className="return-button">← Continue Shopping</button>
      <div className="shopping-cart-top">
        <h1>Shopping Cart</h1>
        <span
          className="cart-items-counter"
          data-testid="mock-cart-item-counter"
        >
          {items.length} Items
        </span>
      </div>

      <div className="vertical-line"></div>

      <table>
        <thead>
          <tr className="cart-item-header-row">
            <th scope="col">PRODUCT DETAILS</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">PRICE</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          <CartItem product={items[0]} />
        </tbody>
      </table>
    </div>
  );
}
