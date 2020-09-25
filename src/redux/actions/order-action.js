import Axios from "axios";
import Cookie from "js-cookie";
import {
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL
} from "./action-types";

const createOrder = order => async dispatch => {
  try {
    dispatch({ type: ORDER_CREATE_REQUEST, payload: order });
    const {
      data: { data: newOrder }
    } = await Axios.post("http://localhost:9000/order/create", order);
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: newOrder });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: error.message });
  }
};

const detailsOrder = orderId => async dispatch => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const { data } = await Axios.get("http://localhost:9000/order/" + orderId);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: error.message });
  }
};

const payOrder = (order, paymentResult) => async dispatch => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
    const { data } = await Axios.put(
      "http://localhost:9000/order/" + order._id + "/pay",
      paymentResult
    );
    dispatch({ type: ORDER_PAY_SUCCESS, payload: data });
    Cookie.remove('cartItems')
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: error.message });
  }
};

export { createOrder, detailsOrder, payOrder };
