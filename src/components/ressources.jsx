import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addRessource, getSpecialRessources } from "../redux/actions";
import {
  saveProduct,
  listProducts,
  editProducts,
  deleteProduct
} from "../redux/actions/product-action";
import axios from "axios";

const Ressources = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [editProduct, setEditProduct] = useState(null);
  const [addProduct, setAddProduct] = useState({
    name: "",
    price: 0,
    image: "",
    brand: "",
    category_id: "",
    countInStock: "",
    isNewProduct: "",
    description: ""
  });
  const [uploading, setUploading] = useState(false);
  const productList = useSelector(state => state.productList);
  const { loading, products, error } = productList;
  console.log(loading, products);
debugger
  const productDelete = useSelector(state => state.productDelete);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete
  } = productDelete;

  const productSave = useSelector(state => state.productSave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave
  } = productSave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listProducts());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = product => {
    setModalVisible(true);
    setEditProduct(product);
  };

  const actionsAPI = (mode, product, e) => {
    e.preventDefault();
    if (mode === "Edit") {
      console.log(product._id);
      dispatch(editProducts(product, product._id));
      return;
    }
    console.log(product, "IS NEW PRODUCT");
    dispatch(saveProduct(product));
  };

  const deleteHandler = product => {
    console.log(product, "DELETE");
    dispatch(deleteProduct(product._id));
    console.log("value");
  };

  const handleAddProduct = useCallback(
    (e, key) => {
      console.log(editProduct);
      if (mode === "Edit") {
        setEditProduct({ ...editProduct, [key]: e.target.value });
        return;
      }
      setAddProduct({ ...addProduct, [key]: e.target.value });
    },
    [editProduct, addProduct, mode]
  );

  //console.log(editProduct, addProduct, mode);

  // const handleAddProduct = (e, key) => {
  //   e.preventDefault();
  //   mode === "Edit"
  //     ? setEditProduct({ ...editProduct, [key]: e.target.value })
  //     : setAddProduct({ ...addProduct, [key]: e.target.value });
  // };
  // console.log("edit", editProduct);
  // console.log("add", addProduct);

  // <form onSubmit={submitHandler}>
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>Products</h3>
        <button onClick={() => openModal({})}>Create Product</button>
      </div>
      {modalVisible && (
        <div className="form">
          <form
            onSubmit={e => {
              const productByMode = mode === "Edit" ? editProduct : addProduct;
              actionsAPI(mode, productByMode, e);
            }}
          >
            <ul className="form-container">
              <li>
                <h2>Créer un produit</h2>
              </li>
              <li>
                {loadingSave && <div>Loading...</div>}
                {errorSave && <div>{errorSave}</div>}
              </li>
              <li>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  // value={name}
                  // onChange={e => setName(e.target.value)}
                  value={editProduct && editProduct.name}
                  onChange={e => handleAddProduct(e, "name")}
                ></input>
              </li>
              <li>
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  // value={price}
                  // onChange={e => setPrice(e.target.value)}
                  value={editProduct && editProduct.price}
                  onChange={e => handleAddProduct(e, "price")}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  // value={image}
                  // onChange={e => setImage(e.target.value)}
                  value={editProduct && editProduct.image}
                  onChange={e => handleAddProduct(e, "image")}
                ></input>
                <input type="file"></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="brand">Brand</label>
                <input
                  type="text"
                  name="brand"
                  // id="brand"
                  // value={brand}
                  // onChange={e => setBrand(e.target.value)}
                  value={editProduct && editProduct.brand}
                  onChange={e => handleAddProduct(e, "brand")}
                ></input>
              </li>
              <li>
                <label htmlFor="category">Category</label>
                <input
                  type="text"
                  name="category_id"
                  id="category_id"
                  // value={category_id}
                  // onChange={e => setCategory(e.target.value)}
                  value={editProduct && editProduct.category_id}
                  onChange={e => handleAddProduct(e, "category_id")}
                ></input>
              </li>
              <li>
                <label htmlFor="countInStock">CountInStock</label>
                <input
                  type="text"
                  name="countInStock"
                  id="countInStock"
                  // value={countInStock}
                  // onChange={e => setCountInStock(e.target.value)}
                  value={editProduct && editProduct.countInStock}
                  onChange={e => handleAddProduct(e, "countInStock")}
                ></input>
              </li>
              <li>
                <label htmlFor="isNewProduct">IsNewProduct</label>
                <input
                  type="text"
                  name="isNewProduct"
                  id="isNewProduct"
                  // value={isNewProduct}
                  // onChange={e => setIsNewProduct(e.target.value)}
                  value={editProduct && editProduct.isNewProduct}
                  onChange={e => handleAddProduct(e, "isNewProduct")}
                ></input>
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  // value={description}
                  // onChange={e => setDescription(e.target.value)}
                  value={editProduct && editProduct.description}
                  onChange={e => handleAddProduct(e, "description")}
                ></textarea>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={
                    mode === "Edit"
                      ? () => {}
                      : e => actionsAPI(mode, addProduct, e)
                  }

                  // onClick={()}
                  // {id ? "Update" : "Create"}
                >
                  {mode === "Edit" ? "Update" : "Create"}
                </button>
                <button type="button" onClick={() => setModalVisible(false)}>
                  Close
                </button>
              </li>
            </ul>
          </form>
          <h1> Here is the admin panel </h1>
        </div>
      )}
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Product_ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(products).map((product, y) => {
              return (
                <Fragment key={y}>
                  {products[product].length > 0 ? (
                    products[product].map((sub, x) => {
                      return (
                        <tr key={x}>
                          <td>{sub._id}</td>
                          <td>{sub.name}</td>
                          <td>{sub.price}</td>
                          <td>{sub.category_id}</td>
                          <td>{sub.brand}</td>
                          <td>
                            <button
                              onClick={() => {
                                setMode("Edit");
                                openModal(sub);
                                setEditProduct(sub);
                              }}
                            >
                              Edit
                            </button>
                            <button onClick={() => deleteHandler(sub)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <div />
                  )}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ressources;
