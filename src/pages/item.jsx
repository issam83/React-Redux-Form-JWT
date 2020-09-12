import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import CustomButton from "../components/custom-button/custom-button";

import "./item.scss";
import { detailsProduct } from "../redux/actions/product-action";

const ItemScreen = props => {
  const [quantity, setQuantity] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { product, loading, error } = productDetails;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(detailsProduct(props.match.params.id));
    return () => {
      //
    };
  }, []);

  const handleAddToCart = () => {
    props.history.push(
      "/checkout/" + props.match.params.id + "?quantity=" + quantity
    );
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      <div className="item-page">
        <div className="item-page-title">
          <h2>{product && product.name}</h2>
          {console.log(product.name)}
        </div>
        <img src={`/${product.image}`} alt="product"></img>
        <div className="collection-footer">
          <ul>
            <li>
              <h4>{product.brand}</h4>
            </li>
            <li>
              Description:
              <h6>{product.description}</h6>
            </li>
            <li>
              Price:
              <b>{product.price}$</b>
            </li>
            <li>
              Quantity:{" "}
              <select
                value={product.quantity}
                onChange={e => {
                  setQuantity(e.target.value);
                }}
              >
                {[...Array(product.countInStock).keys()].map(x => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>
            </li>
          </ul>
        </div>
        {product.countInStock > 0 && (
          <button onClick={handleAddToCart}>Add to Cart</button>
        )}
      </div>
    </div>
  );
};

export default ItemScreen;
