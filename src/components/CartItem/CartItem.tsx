//import React from 'react';
import { useShopContext } from '../../contexts/ShopContext';
import ProductsList from '../Interfaces/ProductsList';
import './styles/CartItem.scss';

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
    <>
      <div className="cart-item-card">
        <div className="cart-item-card-image">
          <img src={currentProduct.image} alt="" />
        </div>
        <div className="cart-item-infos">
          <span className="cart-item-title">{currentProduct.title}</span>
          <span className="cart-item-category">{currentProduct.category}</span>
          <span className="cart-item-price">
            ${currentProduct.price * currentProduct.quantity}
          </span>
        </div>
        <div className="cart-item-buttons">
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
          <button
            onClick={(e) => handleRemoveBtn(e)}
            className="secondary-button"
          >
            Remove
          </button>
        </div>
      </div>
    </>
  );
};
