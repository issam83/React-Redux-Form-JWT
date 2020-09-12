import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  TOGGLE_CART_HIDDEN,
  CART_SAVE_SHIPPING,
  CART_SAVE_PAYMENT
} from "../actions/action-types";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
  shipping: {},
  payment: {}
};

function cartReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden
      };
    case CART_ADD_ITEM:
      const item = action.payload;
      const product = state.cartItems.find(x => x.product === item.product);
      if (product) {
        return {
          cartItems: state.cartItems.map(x =>
            x.product === product.product ? item : x
          )
        };
      }
      return { cartItems: [...state.cartItems, item] };
    case CART_REMOVE_ITEM:
      return {
        cartItems: state.cartItems.filter(x => x.product !== action.payload)
      };
    case CART_SAVE_SHIPPING:
      return { ...state, shipping: action.payload };
    case CART_SAVE_PAYMENT:
      return { ...state, payment: action.payload };
    default:
      return state;
  }
}

export { cartReducer };
