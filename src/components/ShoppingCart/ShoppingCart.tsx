import './ShoppingCart.scss';
import { CartItem } from './CartItem';
import ProductsList from '../ProductsList/ProductsList';

// Remember that these states are just props, so we'll handle them in App.tsx
export default function ShoppingCart({
  items,
  setItems,
  totalItems,
}: ProductsList) {
  //

  const totalCost = items.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <div className="shopping-cart">
      <button className="return-button">← Continue Shopping</button>
      <div className="shopping-cart-top">
        <h1>Shopping Cart</h1>
        <span
          className="cart-items-counter"
          data-testid="mock-cart-item-counter"
        >
          {totalItems === 1 ? `${totalItems} Item` : `${totalItems} Items`}
        </span>
      </div>

      <div className="horizontal-line"></div>

      <table>
        <thead>
          <tr className="cart-item-header-row">
            <th scope="col">PRODUCT DETAILS</th>
            <th scope="col">QUANTITY</th>
            <th scope="col">PRICE</th>
            <th scope="col">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            return (
              <CartItem
                items={items}
                setItems={setItems}
                currentProductId={item.id}
                key={item.id}
              />
            );
          })}
        </tbody>
      </table>
      <div className="horizontal-line"></div>

      <div className="order-summary">
        <h1>Order Summary</h1>
        <span
          className="total-order-cost"
          data-testid={'mock-cart-total-price'}
        >
          TOTAL COST: {totalCost}
        </span>
      </div>
    </div>
  );
}
