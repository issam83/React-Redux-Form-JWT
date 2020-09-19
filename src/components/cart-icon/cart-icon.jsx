import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStructuredSelector } from "reselect";

import { toggleCartHidden } from "../../redux/actions/cart-action";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
import "./cart-icon.scss";

const CartIcon = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const itemCount = cartItems.reduce((a, c) => a + +c.quantity, 0);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(toggleCartHidden());
    return () => {
      //
    };
  }, []);

  const toggleCartHiddenHandler = () => {
    dispatch(toggleCartHidden());
  };

  return (
    <div
      className="cart-icon"
      onClick={toggleCartHiddenHandler}
      style={{ zIndex: 100 }}
    >
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{itemCount}</span>
    </div>
  );
};

export default CartIcon;
