import './styles/Cart.scss';
import { CartItem } from '../components/CartItem/CartItem';
import ProductsList from '../components/Interfaces/ProductsList';
import { useShopContext } from '../contexts/ShopContext';
import { BackButton } from '../components/BackButton/BackButton';

export const Cart = () => {
  //
  const { cartItems, totalItems } = useShopContext();

  const totalCost = cartItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );

  return (
    <>
      <div className="shopping-cart">
        <BackButton />
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

        <section className="all-cart-items">
          {cartItems.map((item) => {
            return <CartItem currentProductId={item.id} key={item.id} />;
          })}
        </section>
      </div>

      <div className="order-summary">
        <span
          className="total-order-cost"
          data-testid={'mock-cart-total-price'}
        >
          TOTAL COST: ${totalCost}
        </span>

        <button className="cta-button">Checkout</button>
      </div>
    </>
  );
};
