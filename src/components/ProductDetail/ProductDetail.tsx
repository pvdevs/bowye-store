import React from 'react';
import './ProductDetail.scss';
import ProductsList from '../ProductsList/ProductsList';

export const ProductDetail = ({
  items,
  setItems,
  totalItems,
  currentProduct,
}: ProductsList) => {
  const listHasProduct = items.find((item) => item.id === currentProduct.id);

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
      <img src="aasf" alt="" />
      <div className="product-details-infos">
        <div className="details-title-rate">
          <h1>Bababa</h1>
          <span>Rating 3.9 - 250 reviews</span>
        </div>
        <p>
          Slim-fitting style, contrast raglan long sleeve, three-button henley
          placket, light weight & soft fabric for breathable and comfortable
          wearing. And Solid stitched shirts with round neck made for durability
          and a great fit for casual fashion wear and diehard baseball fans. The
          Henley style round neckline includes a three-button placket.
        </p>
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
