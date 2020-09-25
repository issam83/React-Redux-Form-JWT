import Axios from "axios";
import Cookie from "js-cookie";
import { URLDevelopment } from "../../helpers/url";
import {
  USER_SIGNIN_FAIL,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT,
  SET_LOADING,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "./action-types";
import setAuthToken from "../../helpers/setAuthToken";

const signin = (email, password) => async dispatch => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("http://localhost:9000/user/signin", {
      email,
      password
    });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set("userInfo", JSON.stringify(data), {expires: 365});
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
  }
};

const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await Axios.get(`${URLDevelopment}/user`);
    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

const register = ({ email, password }) => async dispatch => {
  // config header for axios
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // set body
  const body = JSON.stringify({ email, password });
  dispatch({ type: SET_LOADING });
  try {
    // response
    const res = await Axios.post(
      `${URLDevelopment}/user/register`,
      body,
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
  } catch (error) {
    // const errors = err.response.data.errors
    // if (errors) {
    //   errors.forEach(error => {
    //     console.log(error)
    //   });
    // }
    dispatch({ type: REGISTER_FAIL, payload: error.message });
  }
};

const login = ({ email, password }) => async dispatch => {
  // config header for axios
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  // set body
  const body = JSON.stringify({ email, password });
  dispatch({ type: SET_LOADING });
  try {
    // response
    const res = await Axios.post(`${URLDevelopment}/user/login`, body, config);
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
  } catch (error) {
    // const errors = err.response.data.errors
    // if (errors) {
    //   errors.forEach(error => {
    //     console.log(error)
    //   });
    // }
    dispatch({ type: LOGIN_FAIL, payload: error.message });
  }
};

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  });
};

export { signin, register, loadUser, login };
