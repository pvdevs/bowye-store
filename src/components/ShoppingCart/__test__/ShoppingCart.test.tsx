import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ShoppingCart from '../ShoppingCart';
import Product from '../../ProductsList/Product';

const MockProductChild: Product = {
  cover: '',
  title: 'MockTitle',
  category: 'MockCategory',
  price: 20.5,
  rating: {
    rate: 4.1,
    count: 200,
  },
};

describe('Cart top items counter', () => {
  it('should increase items counter on top of page when a product quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemsCounter).toEqual('2 Items');
  });
});

describe('Single product changes on list', () => {
  it('should increase items counter of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart />);
    const itemCounter = screen.getByTestId('mock-product-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemCounter).toEqual(2);
  });

  it('should increase total price of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart />);
    const incrementBtn = screen.getByTestId('mock-increment-btn');
    const itemTotalPrice = screen.getByTestId('mock-item-total-price');

    await user.click(incrementBtn);

    const newItemTotalPrice = screen.getByTestId('mock-item-total-price');

    expect(newItemTotalPrice).not.toBe(itemTotalPrice);
  });
});

describe('Order summary', () => {
  it('should sum total cost of all items on order summary total', async () => {
    render(<ShoppingCart />);

    const cartTotalPrice = screen.getByTestId('mock-cart-total-price'); // For this to work i should have more than 1 product on the cart
    const productMockTotalPrice = screen.queryAllByTestId(
      'mock-item-total-price'
    );

    let currentTotalPrice: number = 0;
    for (let i = 0; i < productMockTotalPrice.length; i++) {
      const str = productMockTotalPrice[i].textContent;
      const numericValue = parseFloat(str.replace(/[^0-9.-]+/g, ''));

      currentTotalPrice += numericValue;
    }

    expect(cartTotalPrice).toEqual(currentTotalPrice);
  });
});
