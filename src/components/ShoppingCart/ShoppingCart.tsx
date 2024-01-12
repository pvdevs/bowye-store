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

  const totalOfItems = () => {
    let totalItems = 0;
    items.map((item) => {
      totalItems += item.productQuantity.quantity;
    });

    return totalItems;
  };

  return (
    <div className="shopping-cart">
      <button className="return-button">← Continue Shopping</button>
      <div className="shopping-cart-top">
        <h1>Shopping Cart</h1>
        <span
          className="cart-items-counter"
          data-testid="mock-cart-item-counter"
        >
          {`${totalOfItems()} Items`}
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
          {items.map((item) => {
            return <CartItem product={item} key={item.id} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
