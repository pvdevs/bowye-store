//import React from 'react';
import { useShopContext } from '../../contexts/ShopContext';
import ProductsList from '../ProductsList/ProductsList';

export const CartItem = ({ currentProductId }: ProductsList) => {
  const { cartItems, setCartItems } = useShopContext();

  const currentProduct = cartItems.find((item) => item.id === currentProductId);

  const decrementQuantity = () => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === currentProductId) {
          if (item.quantity === 1) return item;
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  const incrementQuantity = () => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === currentProductId) {
          return { ...item, quantity: item.quantity + 1 };
        } else {
          return item;
        }
      })
    );
  };

  const handleDecrementBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    decrementQuantity();
  };

  const handleIncrementBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    incrementQuantity();
  };

  const handleRemoveBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setCartItems(cartItems.filter((item) => item.id !== currentProductId));
  };

  if (!currentProduct) {
    return <span>Error: No product was find</span>;
  }

  return (
    <tr className="cart-item-row">
      <td>
        <div className="product-details-cart">
          <img src={currentProduct.image} alt="" />

          <div>
            <span>{currentProduct.title}</span>
            <span>{currentProduct.title}</span>
            <button
              onClick={(e) => handleRemoveBtn(e)}
              className="secondary-button"
            >
              Remove
            </button>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-table">
          <div className="minus-plus-button-container">
            <button
              className="decrement-button"
              onClick={(e) => handleDecrementBtn(e)}
            >
              -
            </button>
            <div
              className="item-quantity"
              data-testid="mock-product-item-counter"
            >
              {currentProduct.quantity}
            </div>
            <button
              className="increment-button"
              data-testid="mock-increment-btn"
              onClick={(e) => handleIncrementBtn(e)}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td>
        <span>{currentProduct.price}</span>
      </td>
      <td>
        <span data-testid="mock-item-total-price">
          {currentProduct.price * currentProduct.quantity}
        </span>
      </td>
    </tr>
  );
};
