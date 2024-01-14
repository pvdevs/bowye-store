import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import Product from '../../ProductsList/Product';
import { useState } from 'react';
import { ProductDetail } from '../ProductDetail';

const newProduct: Product = {
  image: '',
  title: 'MockTitle',
  id: 52,
  category: 'MockCategory',
  description: 'blabla',
  price: 90,
  rating: {
    rate: 4.2,
    count: 240,
  },
  quantity: 1,
};

const existingProduct: Product = {
  image: '',
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
};

const existingProducts: Product[] = [
  {
    image: '',
    title: 'MockTitle',
    id: 2,
    category: 'MockCategory',
    description: 'blabla',
    price: 20.5,
    rating: {
      rate: 4.1,
      count: 200,
    },
    quantity: 4,
  },
  {
    image: '',
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

const MockNotAdd = () => {
  const [items, setItems] = useState(existingProducts);
  return (
    <ProductDetail
      items={items}
      setItems={setItems}
      currentProduct={newProduct}
    />
  );
};

const MockAlredyAdd = () => {
  const [items, setItems] = useState(existingProducts);
  return (
    <ProductDetail
      items={items}
      setItems={setItems}
      currentProduct={existingProduct}
    />
  );
};

describe('Product details page', () => {
  it('should render the default button if product is not in items', async () => {
    render(<MockNotAdd />);

    const defaultButton = screen.getByRole('button', {
      name: /Add to your cart/i,
    });
    expect(defaultButton).toBeInTheDocument();
  });

  it('should render a minus plus button field if the product is alredy in the cart', async () => {
    render(<MockAlredyAdd />);

    const buttonField = screen.getByTestId('mock-minusplus-field');

    expect(buttonField).toBeInTheDocument();
  });

  it('should increment product quantity when click on + button', async () => {
    const user = userEvent.setup();

    render(<MockAlredyAdd />);

    const productQuantity = screen.getByTestId('mock-product-quantity');
    const incrementButton = screen.getByRole('button', { name: '+' });

    await user.click(incrementButton);

    expect(productQuantity).toHaveTextContent('5');
  });
});
