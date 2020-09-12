import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from "./action-types";
import Axios from "axios";

const sendEmail = (email, message) => async dispatch => {
  dispatch({ type: SEND_MESSAGE_REQUEST, payload: { email, message } });
  try {
    const { data } = await Axios.post("http://localhost:9000/contact/create", {
      email,
      message
    });
    dispatch({ type: SEND_MESSAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SEND_MESSAGE_FAIL, payload: error.message });
  }
};

export { sendEmail };
