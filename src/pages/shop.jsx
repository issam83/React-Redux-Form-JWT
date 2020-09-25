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
                  console.log(sub);
                  return (
                    <div className="collection-item" key={x}>
                      <img
                        className="image"
                        src={`http://localhost:9000/${sub.images[0]}`}
                      />
                      {sub.isNewProduct === false ? (
                        <div className="collection-footer">
                          <span className="name">{sub.brand}</span>
                          <span className="price">{sub.price}$</span>
                        </div>
                      ) : (
                        <div className="collection-footer">
                          <span className="name">{sub.brand}</span>
                          <span className="price">{sub.price}$</span>
                          <div
                            style={{
                              position: "absolute",
                              top: "0%",
                              transform: "translate(10px, 10px)",
                              background:
                                "repeating-linear-gradient(black, transparent 100px)",
                              borderRadius: "47%",
                              marginLeft: "4%",
                              width: "23%",
                              opacity: "0.8"
                            }}
                          >
                            <h5
                              style={{
                                color: "ivory",
                                textAlign: "center",
                                marginTop: "15%"
                              }}
                            >
                              New
                            </h5>
                          </div>
                        </div>
                      )}
                      {sub.countInStock > 0 ? (
                        <Link to={`/shop/${sub._id}`}>
                          <CustomButton inverted> MORE DETAILS </CustomButton>
                        </Link>
                      ) : (
                        <CustomButton disabled>INDIPONIBLE</CustomButton>
                      )}
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
