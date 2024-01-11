//import React from 'react';
import Product from '../ProductsList/Product';

interface Prop {
  product: Product;
}

export const CartItem = ({ product }: Prop) => {
  return (
    <tr className="cart-item-row">
      <td>
        <div className="product-details-cart">
          <img src={product.title} alt="" />

          <div>
            <span>{product.title}</span>
            <span>{product.title}</span>
            <button>Remove</button>
          </div>
        </div>
      </td>
      <td>
        <div className="quantity-table">
          <div className="minus-plus-button-container">
            <button
              className="decrement-button"
              onClick={(e) => product.productQuantity.decrementQuantity(e)}
            >
              -
            </button>
            <div
              className="item-quantity"
              data-testid="mock-product-item-counter"
            >
              {product.productQuantity.quantity}
            </div>
            <button
              className="increment-button"
              data-testid="mock-increment-btn"
              onClick={product.productQuantity.incrementQuantity}
            >
              +
            </button>
          </div>
        </div>
      </td>
      <td>
        <span>{product.price}</span>
      </td>
      <td>
        <span>{product.price * product.productQuantity.quantity}</span>
      </td>
    </tr>
  );
};
