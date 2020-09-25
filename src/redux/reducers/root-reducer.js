import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { reducer as form } from "redux-form";
import Cookie from "js-cookie";

import AuthentificationReducer from "./authentification";
import ActionInfoReducer from "./action-info";
import {
  productListReducer,
  productDetailsReducer,
  productSaveReducer,
  productDeleteReducer,
  productCategoryReducer,
  productEditReducer
} from "./product-list";
import RessourceReducer from "./ressources";
import ErrorReducer from "./errors";
import { cartReducer } from "./cart-reducer";
import { userSigninReducer } from "./user-reducer";
import { sendMessageReducer } from "./message-reducer";
import {
  categoryListReducer,
  categoryDetailsReducer,
  categorySaveReducer,
  categoryEditReducer,
  categoryDeleteReducer
} from "./category-reducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer
} from "./order-reducer";

const cartItems = Cookie.getJSON("cartItems") || [];
const userInfo = Cookie.getJSON("userInfo") || null;

const initialState = {
  cart: { cartItems, shipping: {}, payment: {}, userSignin: { userInfo } }
};
const rootReducer = combineReducers({
  form,
  authentification: AuthentificationReducer,
  categoryProduct: productCategoryReducer,
  productDetails: productDetailsReducer,
  productList: productListReducer,
  actionInfo: ActionInfoReducer,
  ressource: RessourceReducer,
  errors: ErrorReducer,
  cart: cartReducer,
  message: sendMessageReducer,
  userSignin: userSigninReducer,
  productSave: productSaveReducer,
  productEdit: productEditReducer,
  productDelete: productDeleteReducer,
  categoryList: categoryListReducer,
  categoryDetails: categoryDetailsReducer,
  categorySave: categorySaveReducer,
  categoryEdit: categoryEditReducer,
  categoryDelete: categoryDeleteReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
