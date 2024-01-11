import { render, screen } from '@testing-library/react';
import { expect, describe, it, vi } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import ShoppingCart from '../ShoppingCart';
import Product from '../../ProductsList/Product';

const MockSingleProduct: Product[] = [
  {
    cover: '',
    title: 'MockTitle',
    id: 2,
    category: 'MockCategory',
    price: 20.5,
    rating: {
      rate: 4.1,
      count: 200,
    },
    productQuantity: {
      quantity: 1,
      decrementQuantity: vi.fn(),
      incrementQuantity: vi.fn(),
    },
  },
];

const MockMultipleProducts: Product[] = [
  {
    cover: '',
    title: 'MockTitle',
    id: 2,
    category: 'MockCategory',
    price: 20.5,
    rating: {
      rate: 4.1,
      count: 200,
    },
    productQuantity: {
      quantity: 1,
      decrementQuantity: vi.fn(),
      incrementQuantity: vi.fn(),
    },
  },
  {
    cover: '',
    title: 'MockTitle2',
    id: 3,
    category: 'MockCategory2',
    price: 40.5,
    rating: {
      rate: 4.1,
      count: 200,
    },
    productQuantity: {
      quantity: 1,
      decrementQuantity: vi.fn(),
      incrementQuantity: vi.fn(),
    },
  },
];

describe('Items counter on top of cart', () => {
  it('should equal the quantity of multiple different items ', async () => {
    render(<ShoppingCart items={MockMultipleProducts} setItems={vi.fn()} />);

    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    screen.debug();
    expect(itemsCounter).toEqual(`${MockMultipleProducts.length} Items`);
  });

  it('should increase when a product quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart items={MockSingleProduct} setItems={vi.fn()} />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemsCounter).toEqual('2 Items');
  });

  it('should equal the quantity of multiple different items with multiple quantities ', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart items={MockMultipleProducts} setItems={vi.fn()} />);
    const itemsCounter = screen.getByTestId('mock-cart-item-counter');
    const [itemCounter] = screen.queryAllByTestId('mock-product-item-counter');
    const [incrementBtn] = screen.queryAllByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    const updatedItemCounter = Number(itemCounter.textContent);

    expect(itemsCounter).toEqual(
      `${MockMultipleProducts.length + updatedItemCounter} Items`
    );
  });
});

describe('Single product changes on list', () => {
  it('should increase items counter of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart items={MockSingleProduct} setItems={vi.fn()} />);
    const itemCounter = screen.getByTestId('mock-product-item-counter');
    const incrementBtn = screen.getByTestId('mock-increment-btn');

    await user.click(incrementBtn);

    expect(itemCounter).toEqual(2);
  });

  it('should increase total price of own product when its quantity changes', async () => {
    const user = userEvent.setup();

    render(<ShoppingCart items={MockSingleProduct} setItems={vi.fn()} />);
    const incrementBtn = screen.getByTestId('mock-increment-btn');
    const itemTotalPrice = screen.getByTestId('mock-item-total-price');

    await user.click(incrementBtn);

    const newItemTotalPrice = screen.getByTestId('mock-item-total-price');

    expect(newItemTotalPrice).not.toBe(itemTotalPrice);
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
