import React from 'react';
import './ProductDetail.scss';
import ProductsList from '../ProductsList/ProductsList';

export const ProductDetail = ({
  items,
  setItems,
  currentProduct,
  currentProductId,
}: ProductsList) => {
  const listHasProduct = items.find((item) => item.id === currentProductId);

  const decrementQuantity = () => {
    setItems(
      items.map((item) => {
        if (item.id === currentProduct?.id) {
          if (item.quantity === 1) return item;
          return { ...item, quantity: item.quantity - 1 };
        } else {
          return item;
        }
      })
    );
  };

  const incrementQuantity = () => {
    setItems(
      items.map((item) => {
        if (item.id === currentProduct?.id) {
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

  return (
    <div className="product-details">
      <img src={currentProduct?.image} alt="" />
      <div className="product-details-infos">
        <div className="details-title-rate">
          <h1>{currentProduct?.title}</h1>
          <span>
            Rating {currentProduct?.rating.rate} -{' '}
            {currentProduct?.rating.count} reviews
          </span>
        </div>
        <p>{currentProduct?.description}</p>
        <span>{currentProduct?.category}</span>
        <div className="horizontal-line"></div>
        <div className="cta">
          {listHasProduct ? (
            <div
              className="minus-plus-buttons"
              data-testid="mock-minusplus-field"
            >
              <button onClick={(e) => handleDecrementBtn(e)}>-</button>
              <span data-testid="mock-product-quantity">
                {listHasProduct.quantity}
              </span>
              <button onClick={(e) => handleIncrementBtn(e)}>+</button>
            </div>
          ) : (
            <button>Add to your cart - ${currentProduct?.price}</button>
          )}
        </div>
      </div>
    </div>
  );
};
