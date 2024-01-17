import './styles/Cart.scss';
import { CartItem } from '../components/CartItem/CartItem';
import ProductsList from '../components/Interfaces/ProductsList';
import { useShopContext } from '../contexts/ShopContext';

export const Cart = () => {
  //
  const { cartItems, totalItems } = useShopContext();

  const totalCost = cartItems.reduce(
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
          {cartItems.map((item) => {
            return <CartItem currentProductId={item.id} key={item.id} />;
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

        <button className="cta-button">Checkout</button>
      </div>
    </div>
  );
};
