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

const MockCartMultiple = () => {
  const [items, setItems] = useState(MockMultipleProducts);
  const totalItems = items.reduce((acc, cur) => acc + cur.quantity, 0);

  return (
    <ShoppingCart items={items} setItems={setItems} totalItems={totalItems} />
  );
};

describe('Items counter on top of cart', () => {
  it('should equal the quantity of multiple different items ', async () => {
    render(<MockCartMultiple />);

    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    expect(itemsCounter).toHaveTextContent('2 Items');
  });

  it('should increase when a product quantity changes', async () => {
    const user = userEvent.setup();

    render(<MockCartSingle />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemsCounter).toHaveTextContent(/2 Items/i);
  });

  it('should equal the quantity of multiple different items with multiple quantities ', async () => {
    const user = userEvent.setup();

    render(<MockCartMultiple />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    const [incrementBtn] = screen.queryAllByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemsCounter).toHaveTextContent(/3 Items/i);
  });

  it('should display "item" when its only 1', async () => {
    render(<MockCartSingle />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');

    expect(itemsCounter).toHaveTextContent(/1 Item/i);
  });
});

describe('Products list changes', () => {
  it('should increase items counter of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<MockCartSingle />);
    const itemCounter = screen.getByTestId('mock-product-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemCounter).toHaveTextContent('2');
  });

  it('should increase total price of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<MockCartSingle />);
    const incrementBtn = screen.getByTestId('mock-increment-btn');
    await user.click(incrementBtn);
    const newItemTotalPrice = screen.getByTestId('mock-item-total-price');

    screen.debug();
    expect(newItemTotalPrice).not.toHaveTextContent('20.5'); // this is the unitary price
  });
});

describe('Order summary', () => {
  it('should sum total cost of all items on order summary total', async () => {
    render(<MockCartMultiple />);

    const cartTotalPrice = screen.getByTestId('mock-cart-total-price');
    expect(cartTotalPrice).toHaveTextContent('TOTAL COST: 61');
  });

  it('should update counter when a item is removed with quantity', async () => {
    const user = userEvent.setup();

    render(<MockCartMultiple />);
    const cartItemCounter = screen.getByTestId('mock-cart-item-counter');
    const [incrementBtn] = screen.queryAllByTestId('mock-increment-btn');
    const [removeButton] = screen.queryAllByRole('button', { name: 'Remove' });
    // It was 2 items
    await user.click(incrementBtn);
    // Now are 3 items
    await user.click(removeButton);
    // Now it should be 1
    expect(cartItemCounter).toHaveTextContent('1 Item');
  });
});
