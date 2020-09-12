import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState, Fragment } from "react";
import { categoryProducts } from "../redux/actions/product-action";

const ItemByCategory = (props, _id) => {
  const categoryProduct = useSelector(state => state.categoryProduct);
  const { products, loading, error } = categoryProduct;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(categoryProducts(props.match.params.id));
    return () => {
      //
    };
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {console.log(props.match.params.id)}
      <h1>ItemByCategory</h1>
      {products.map(product => (
        <h1>{product.name}</h1>
      ))}
    </div>
  );
};

export default ItemByCategory;
