import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import CustomButton from "../components/custom-button/custom-button";
import { addItem } from "../redux/actions/cart.action";

import "./shop.scss";
import { listProducts } from "../redux/actions/product-action";
import ItemScreen from "./item";

const ShopScreen = () => {
  const productList = useSelector(state => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
    return () => {
      //
    };
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div>
      {Object.keys(products).map((product, i) => {
        return (
          <div key={i}>
            <h2 className="title">{product.toUpperCase()}</h2>
            <ul className="product-list">
              {products[product]
                .filter((item, idx) => idx < 4)
                .map((sub, x) => {
                  // if (sub.isNewProduct === false) {
                  //   return <div style={{ border: "red" }}></div>;
                  // }
                  return (
                    <div className="collection-item" key={x}>
                      <div
                        className="image"
                        style={{ backgroundImage: `url(${sub.image})` }}
                      />
                      <div className="collection-footer">
                        <span className="name">{sub.brand}</span>
                        <span className="price">{sub.price}$</span>
                      </div>
                      <Link to={`/shop/${sub._id}`}>
                        <CustomButton inverted> MORE DETAILS </CustomButton>
                      </Link>
                    </div>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ShopScreen;
