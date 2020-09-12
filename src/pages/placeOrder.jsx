import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cart-action";
import CheckoutSteps from "../components/checkoutSteps";

function PlaceOrder(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems, shipping, payment } = cart;
  if (!shipping.address) {
    props.history.push("/shipping");
  } else if (!payment.paymentMethod) {
    props.history.push("/payment");
  }

  const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.quantity, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = 0.2 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const dispatch = useDispatch();

  const placeOrderHandler = () => {};

  useEffect(() => {}, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3></CheckoutSteps>

      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {cart.shipping.country},{cart.shipping.address},
              {cart.shipping.city},{cart.shipping.postalCode}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {cart.payment.paymentMethod}</div>
          </div>
          <div>
            <ul>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {cartItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                cartItems.map(item => (
                  <div>
                    <img src={`/${item.image}`} alt="product" />
                    <div>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                      <div>Quantity :{item.quantity}</div>
                    </div>
                    <div>{item.price} $</div>
                  </div>
                ))
              )}
            </ul>
          </div>
        </div>
        <div className="placeorder-action">
          <ul>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>{itemsPrice} $</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>{shippingPrice} $</div>
            </li>
            <li>
              <div>Tax</div>
              <div>{taxPrice} $</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>{totalPrice} $</div>
            </li>
            <li>
              <button onClick={placeOrderHandler}>Place Order</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
