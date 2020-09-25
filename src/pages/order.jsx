import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cart-action";
import CheckoutSteps from "../components/checkoutSteps";
import { detailsOrder, payOrder } from "../redux/actions/order-action";
import PaypalButton from "../components/paypal/paypal-button";

function Order(props) {
  const orderPay = useSelector(state => state.orderPay);
  const { loading: loadingPay, success: successPay, error: erroPay } = orderPay;
  const dispatch = useDispatch();

  useEffect(() => {
    if (successPay) {
      alert("Votre payment a bien été effectué <br /> Vous allez être automatiquement redirigé sur la page d'acceuil");
      window.location.assign("http://localhost:3000");
    } else {
      dispatch(detailsOrder(props.match.params.id));
    }
    return () => {
      //
    };
  }, [successPay]);

  console.log(successPay);
  console.log(props.history);
  const handleSuccessPayment = paymentResult => {
    dispatch(payOrder(order, paymentResult));
  };

  const orderDetails = useSelector(state => state.orderDetails);
  const { loading, order, error } = orderDetails;

  return loading ? (
    <div>Loading ...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="placeorder">
        <div className="placeorder-info">
          <div>
            <h3>Shipping</h3>
            <div>
              {order.shipping.country},{order.shipping.address},
              {order.shipping.city},{order.shipping.postalCode}
            </div>
            <div>
              {order.isDelivered
                ? "Delivered at " + order.deliveredAt
                : "Not Delivered"}
            </div>
          </div>
          <div>
            <h3>Payment</h3>
            <div>Payment Method: {order.payment.paymentMethod}</div>
            <div>{order.isPaid ? "Paid at " + order.paidAt : "Not Paid"}</div>
          </div>
          <div>
            <ul>
              <li>
                <h3>Shopping Cart</h3>
                <div>Price</div>
              </li>
              {order.orderItems.length === 0 ? (
                <div>Cart is empty</div>
              ) : (
                order.orderItems.map(item => (
                  <div>
                    <img
                      src={`http://localhost:9000/${item.images[0]}`}
                      alt="product"
                    />
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
            <li style={{ width: "100%" }}>
              {!order.isPaid && (
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment}
                />
              )}
            </li>
            <li>
              <h3>Order Summary</h3>
            </li>
            <li>
              <div>Items</div>
              <div>{order.itemsPrice} $</div>
            </li>
            <li>
              <div>Shipping</div>
              <div>{order.shippingPrice} $</div>
            </li>
            <li>
              <div>Tax</div>
              <div>{order.taxPrice} $</div>
            </li>
            <li>
              <div>Order Total</div>
              <div>{order.totalPrice} $</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Order;
