import axios from "axios";
import Cookie from "js-cookie";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  TOGGLE_CART_HIDDEN,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT
} from "../actions/action-types";

const toggleCartHidden = () => ({
  type: TOGGLE_CART_HIDDEN
});

const addToCart = (_id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`http://localhost:9000/product/${_id}`);
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        product: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        brand: data.brand,
        countInStock: data.countInStock,
        quantity
      }
    });
    const {
      cart: { cartItems }
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {}
};

const removeFromCart = productId => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });

  const {
    cart: { cartItems }
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = data => dispatch => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = data => dispatch => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export {
  addToCart,
  removeFromCart,
  toggleCartHidden,
  saveShipping,
  savePayment
};
