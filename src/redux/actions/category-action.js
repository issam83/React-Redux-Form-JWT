import axios from "axios";
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
  CATEGORY_SAVE_REQUEST,
  CATEGORY_SAVE_SUCCESS,
  CATEGORY_SAVE_FAIL,
  CATEGORY_EDIT_SUCCESS,
  CATEGORY_EDIT_FAIL,
  CATEGORY_DELETE_REQUEST,
  CATEGORY_DELETE_SUCCESS,
  CATEGORY_DELETE_FAIL,
  CATEGORY_DETAILS_REQUEST,
  CATEGORY_DETAILS_SUCCESS,
  CATEGORY_DETAILS_FAIL,
  CATEGORY_EDIT_REQUEST
} from "./action-types";

const listCategories = () => async dispatch => {
  try {
    dispatch({ type: CATEGORY_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:9000/category/");
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: error.message });
  }
};

const detailsCategory = _id => async dispatch => {
  try {
    dispatch({ type: CATEGORY_DETAILS_REQUEST, payload: _id });
    const { data } = await axios.get(`http://localhost:9000/category/${_id}`);
    dispatch({ type: CATEGORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_DETAILS_FAIL, payload: error.message });
  }
};

const saveCategory = category => async (dispatch, getState) => {
  try {
    dispatch({ type: CATEGORY_SAVE_REQUEST, payload: category });
    const {
      userSignin: { userInfo }
    } = getState();
    const { data } = await axios.post(
      "http://localhost:9000/category/create",
      category,
      {
        headers: {
          Authorization: "Bearer" + userInfo.token
        }
      }
    );
    dispatch({ type: CATEGORY_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_SAVE_FAIL, payload: error.message });
  }
};

const editCategories = (category, _id) => async (dispatch, getState) => {
  console.log("redux", category);
  try {
    dispatch({ type: CATEGORY_EDIT_REQUEST, payload: category });
    const {
      userSignin: { userInfo }
    } = getState();
    console.log(category, "request");
    console.log(_id, "id request");
    const { data } = await axios.put(
      `http://localhost:9000/category/${_id}`,
      category,
      {
        headers: {
          Authorization: "Bearer" + userInfo.token
        }
      }
    );
    dispatch({ type: CATEGORY_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CATEGORY_EDIT_FAIL, payload: error.message });
  }
};

const deleteCategory = _id => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo }
    } = getState();
    dispatch({ type: CATEGORY_DELETE_REQUEST, payload: _id });
    const { data } = await axios.delete(
      `http://localhost:9000/category/${_id}`,
      {
        headers: {
          Authorization: "Bearer" + userInfo.token
        }
      }
    );
    dispatch({ type: CATEGORY_DELETE_SUCCESS, payload: data, success: true });
    // ici mettre a jours le redux pour recup automatiquement la nouvelle liste
    const { data: newList } = await axios.get(
      "http://localhost:9000/category/"
    );
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: newList });
  } catch (error) {
    dispatch({ type: CATEGORY_DELETE_FAIL, payload: error.message });
  }
};

export {
  listCategories,
  detailsCategory,
  saveCategory,
  editCategories,
  deleteCategory
};
