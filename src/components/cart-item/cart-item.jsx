import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart-action";

import "./cart-item.scss";

const CartItem = ({ item: { images, name, price, quantity } }) => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const removeFromCartHandler = productId => {
    dispatch(removeFromCart(productId));
  };
  console.log(cartItems);
  return (
    <div className="cart-item">
      <img src={`http://localhost:9000/${images[0]}`} alt="item" />
      {console.log(images[0])}
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
        {cartItems.map((item, x) => {
          console.log(item.product);
          return (
            <button
              key=
              type="button"
              onClick={() => removeFromCartHandler(item.product)}
            >
              Delete Item
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CartItem;
