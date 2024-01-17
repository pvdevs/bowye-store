import React from 'react';
import './ProductDetail.scss';
import ProductsList from '../ProductsList/ProductsList';

export const ProductDetail = ({
  items,
  setItems,
  currentProduct,
  currentProductId,
}: ProductsList) => {
  if (!currentProduct) {
    throw new Error('must contain a current product!');
  }

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
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === currentProduct?.id) {
          console.log(currentProduct.quantity);

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

    if (listHasProduct?.quantity === 1) {
      setItems(items.filter((item) => item.id !== listHasProduct.id));
    } else {
      decrementQuantity();
    }
  };

  const handleIncrementBtn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    incrementQuantity();
  };

  const handleAddToCart = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    setItems([...items, currentProduct]);
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
              className="minus-plus-button-container"
              data-testid="mock-minusplus-field"
            >
              <button onClick={(e) => handleDecrementBtn(e)}>-</button>
              <div data-testid="mock-product-quantity">
                {listHasProduct.quantity}
              </div>
              <button onClick={(e) => handleIncrementBtn(e)}>+</button>
            </div>
          ) : (
            <button onClick={(e) => handleAddToCart(e)} className="cta-button">
              Add to your cart - ${currentProduct?.price}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
