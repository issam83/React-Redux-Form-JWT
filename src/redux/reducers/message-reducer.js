import {
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL
} from "../actions/action-types";

const initialState = {
  email: "",
  message: ""
};

function sendMessageReducer(state = initialState, action) {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export { sendMessageReducer };
