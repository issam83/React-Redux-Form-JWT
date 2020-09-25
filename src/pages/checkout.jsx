import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../redux/actions/cart-action";
import axios from "axios";

import StripeCheckoutButton from "../components/stripe-button/stripe-button";

import "./checkout.scss";

function CheckoutItem(props) {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const productId = props.match.params.id;
  const quantity = props.location.search
    ? Number(props.location.search.split("=")[1])
    : 1;
  const dispatch = useDispatch();
  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId));
  };

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, quantity));
    }
  }, []);

  const checkoutHandler = () => {
    props.history.push("/shipping");
  };

  const total = cartItems.reduce((a, c) => a + +c.price * +c.quantity, 0);

  return (
    <div>
      <div>
        <ul>
          <li>
            <h3>Shopping Cart</h3>
          </li>
          {cartItems.length === 0 ? (
            <div>Cart is empty</div>
          ) : (
            cartItems.map((item, i) => (
              <div className="checkout-item" key={i}>
                <img
                  className="image-container"
                  src={`/${item.images[0]}`}
                  alt="product"
                />
                <div className="name">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                  <div className="value">
                    Quantity :
                    <select
                      value={item.quantity}
                      onChange={e =>
                        dispatch(addToCart(item.product, e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map(x => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="price">{item.price} $</div>
                <button
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  Delete Item
                </button>
              </div>
            ))
          )}
        </ul>
      </div>
      <div>
        <h3>
          Subtotal ({cartItems.reduce((a, c) => a + +c.quantity, 0)} items) : ${" "}
          {cartItems.reduce((a, c) => a + +c.price * +c.quantity, 0)}
        </h3>
        <Link to={"/shop"}>
          <button> Go back to shopping </button>
        </Link>
        OR
        <button onClick={checkoutHandler} disabled={cartItems.length === 0}>
          Proceed to Checkout
        </button>
      </div>
    </div>
    // <StripeCheckoutButton />
    // <PaypalButton
    // toPay={total}
    // onSuccess={transactionSuccess}
    // onError={transactionError}
    // onCanceled={transactionCanceled}
    // />
  );
}

export default CheckoutItem;

// import React from "react";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

// import {
//   selectCartItems,
//   selectCartTotal
// } from "../redux/selectors/cart.selector";

// import "./checkout.scss";
// import CheckoutItem from "../components/checkout-item/checkout-item";
// import StripeCheckoutButton from "../components/stripe-button/stripe-button";

// const CheckoutPage = ({ cartItems, total }) => (
//   <div className="checkout-page">
//     <div className="checkout-header">
//       <div className="header-block">
//         <span>Product</span>
//       </div>
//       <div className="header-block">
//         <span>Description</span>
//       </div>
//       <div className="header-block">
//         <span>Quantity</span>
//       </div>
//       <div className="header-block">
//         <span>Price</span>
//       </div>
//       <div className="header-block">
//         <span>Remove</span>
//       </div>
//     </div>
//     {cartItems.map(cartItem => (
//       <CheckoutItem key={cartItem.id} cartItem={cartItem} />
//     ))}
//     <div className="total">
//       <span>TOTAL: ${total}</span>
//     </div>
//     <div className="test-warning">
//       *Please use the following test credit card for payments* 4000 0025 0000
//       0003 - Exp: 01/22 - CVV: 123
//     </div>
//     <StripeCheckoutButton price={total} />
//   </div>
// );

// const mapStateToProps = createStructuredSelector({
//   cartItems: selectCartItems,
//   total: selectCartTotal
// });

// export default connect()(CheckoutPage);
