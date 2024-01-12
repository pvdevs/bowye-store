import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ShoppingCart from '../ShoppingCart';
import Product from '../../ProductsList/Product';
import ProductsList from '../../ProductsList/ProductsList';
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

describe('Single product changes on list', () => {
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
    render(<ShoppingCart items={MockMultipleProducts} setItems={vi.fn()} />);

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
