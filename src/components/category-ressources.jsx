import React, { useEffect, useState, useCallback, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  saveCategory,
  listCategories,
  editCategories,
  deleteCategory
} from "../redux/actions/category-action";

const CategoryRessources = props => {
  const [modalVisible, setModalVisible] = useState(false);
  const [mode, setMode] = useState("");
  const [editCategory, setEditCategory] = useState([]);
  const [addCategory, setAddCategory] = useState({
    description: "",
    image: "",
    name: "",
    shortDescription: ""
  });
  const [uploading, setUploading] = useState(false);
  const categoryList = useSelector(state => state.categoryList);
  const { loading, categories, error } = categoryList;
  console.log(loading, categories);

  const categoryDelete = useSelector(state => state.categoryDelete);
  const { success: successDelete } = categoryDelete;

  const categorySave = useSelector(state => state.categorySave);
  const {
    loading: loadingSave,
    success: successSave,
    error: errorSave
  } = categorySave;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setModalVisible(false);
    }
    dispatch(listCategories());
    return () => {
      //
    };
  }, [successSave, successDelete]);

  const openModal = category => {
    setModalVisible(true);
    setEditCategory(category);
  };

  const actionsAPI = (mode, category, e) => {
    e.preventDefault();
    if (mode === "Edit") {
      console.log(category._id);
      dispatch(editCategories(category, category._id));
      return;
    }
    console.log(category, "IS NEW PRODUCT");
    dispatch(saveCategory(category));
  };

  const deleteHandler = category => {
    console.log(category, "DELETE");
    dispatch(deleteCategory(category._id));
    console.log("value");
  };

  const handleAddCategory = useCallback(
    (e, key) => {
      console.log(editCategory);
      if (mode === "Edit") {
        setEditCategory({ ...editCategory, [key]: e.target.value });
        return;
      }
      setAddCategory({ ...addCategory, [key]: e.target.value });
    },
    [editCategory, addCategory, mode]
  );

  {
    console.log(categories);
  }
  return (
    <div className="content content-margined">
      <div className="product-header">
        <h3>categories</h3>
        <button onClick={() => openModal({})}>Create Category</button>
      </div>
      {modalVisible && (
        <div className="form">
          <form
            onSubmit={e => {
              const categoryByMode =
                mode === "Edit" ? editCategory : addCategory;
              actionsAPI(mode, categoryByMode, e);
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
                  value={editCategory && editCategory.name}
                  onChange={e => handleAddCategory(e, "name")}
                ></input>
              </li>
              <li>
                <label htmlFor="shortDescription">Price</label>
                <input
                  type="text"
                  name="shortDescription"
                  id="shortDescription"
                  value={editCategory && editCategory.price}
                  onChange={e => handleAddCategory(e, "shortDescription")}
                ></input>
              </li>
              <li>
                <label htmlFor="image">Image</label>
                <input
                  type="text"
                  name="image"
                  id="image"
                  value={editCategory && editCategory.images}
                  onChange={e => handleAddCategory(e, "image")}
                ></input>
                <input type="file"></input>
                {uploading && <div>Uploading...</div>}
              </li>
              <li>
                <label htmlFor="description">Description</label>
                <textarea
                  type="text"
                  name="description"
                  id="description"
                  value={editCategory && editCategory.description}
                  onChange={e => handleAddCategory(e, "description")}
                ></textarea>
              </li>
              <li>
                <button
                  type="submit"
                  onClick={
                    mode === "Edit"
                      ? () => {}
                      : e => actionsAPI(mode, addCategory, e)
                  }
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
              <th>Name</th>
              <th>Description</th>
              <th>Short Description</th>
              <th>action</th>
            </tr>
          </thead>
            <tbody>
              
                  <Fragment>
                    {categories.length > 0 ? (
                      categories.map((category, x) => {
                        return (
                          <tr key={x}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>{category.shortDescription}</td>
                            <td>
                              <button
                                onClick={() => {
                                  setMode("Edit");
                                  openModal(category);
                                  setEditCategory(category);
                                }}
                              >
                                Edit
                              </button>
                              <button onClick={() => deleteHandler(category)}>
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
                
              
            </tbody>
            </table>
            </div>
            </div>
   
  );
};

export default CategoryRessources;
