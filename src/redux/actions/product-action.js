import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_EDIT_FAIL,
  PRODUCT_EDIT_SUCCESS,
  PRODUCT_EDIT_REQUEST
} from "./action-types";
import axios from "axios";

const listProducts = () => async dispatch => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:9000/product/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};

const categoryProducts = category_id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_CATEGORY_REQUEST });
    const { data } = await axios.get(
      `http://localhost:9000/product/category/${category_id}`
    );
    dispatch({ type: PRODUCT_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_FAIL, payload: error.message });
  }
};

const detailsProduct = _id => async dispatch => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: _id });
    const { data } = await axios.get(`http://localhost:9000/product/${_id}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: error.message });
  }
};

// const saveProduct = (_id, product) => async (dispatch, getState) => {
//   console.log("redux", product);
//   try {
//     dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
//     const {
//       userSignin: { userInfo }
//     } = getState();
//     if (!product._id) {
//       const { data } = await axios.post(
//         "http://localhost:9000/product/create",
//         product,
//         {
//           headers: {
//             Authorization: "Bearer" + userInfo.token
//           }
//         }
//       );
//       dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
//     } else {
//       const { data } = await axios.put(
//         `http://localhost:9000/product/${_id}`,
//         product,
//         {
//           headers: {
//             Authorization: "Bearer" + userInfo.token
//           }
//         }
//       );
//       dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
//     }
//   } catch (error) {
//     dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
//   }
// };
const saveProduct = product => async (dispatch, getState) => {
  try {
    dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
    const {
      userSignin: { userInfo }
    } = getState();
    const { data } = await axios.post(
      "http://localhost:9000/product/create",
      product
      // {
      //   headers: {
      //     Authorization: "Bearer" + userInfo.token
      //   }
      // }
    );
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: error.message });
  }
};

const editProducts = (product, _id) => async (dispatch, getState) => {
  console.log("redux", product);
  try {
    dispatch({ type: PRODUCT_EDIT_REQUEST, payload: product });
    const {
      userSignin: { userInfo }
    } = getState();
    console.log(product, "request");
    console.log(_id, "id request");
    const { data } = await axios.put(
      `http://localhost:9000/product/${_id}`,
      product
      // {
      //   headers: {
      //     Authorization: "Bearer" + userInfo.token
      //   }
      // }
    );
    dispatch({ type: PRODUCT_EDIT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_EDIT_FAIL, payload: error.message });
  }
};

const deleteProduct = _id => async (dispatch, getState) => {
  try {
    const {
      userSignin: { userInfo }
    } = getState();
    dispatch({ type: PRODUCT_DELETE_REQUEST, payload: _id });
    const { data } = await axios.delete(
      `http://localhost:9000/product/${_id}`
      // {
      //   headers: {
      //     Authorization: "Bearer" + userInfo.token
      //   }
      // }
    );
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: data, success: true });
    // ici mettre a jours le redux pour recup automatiquement la nouvelle liste
    const { data: newList } = await axios.get("http://localhost:9000/product/");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: newList });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: error.message });
  }
};

export {
  listProducts,
  categoryProducts,
  detailsProduct,
  saveProduct,
  editProducts,
  deleteProduct
};
