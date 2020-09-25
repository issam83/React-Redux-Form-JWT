import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { categoryProducts } from "../redux/actions/product-action";
import { Link } from "react-router-dom";

import CustomButton from "../components/custom-button/custom-button";

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
      {products.map(product => (
        // <h2 className="title">{product.name.toUpperCase()}</h2>
        //   <div
        //     className="image"
        //     style={{ backgroundImage: `url(${product.image})` }}
        //   />
        //{product.images.map(image => (
        // ))}
        <div>
          {console.log("produit", product)}
          <h1>{product.name}</h1>

          <ul className="product-list">
            <div className="collection-item">
              <img src={`http://localhost:9000/${product.images[0]}`}></img>
              {product.isNewProduct === false ? (
                <div className="collection-footer">
                  <span className="name">{product.brand}</span>
                  <span className="price">{product.price}$</span>
                </div>
              ) : (
                <div className="collection-footer">
                  <span className="name">{product.brand}</span>
                  <span className="price">{product.price}$</span>
                  <br />
                  <p>C'est un nouveau produit</p>
                </div>
              )}
              {product.countInStock > 0 ? (
                <Link to={`/shop/${product._id}`}>
                  <CustomButton inverted> MORE DETAILS </CustomButton>
                </Link>
              ) : (
                <CustomButton disabled>INDIPONIBLE</CustomButton>
              )}
            </div>
          </ul>
        </div>
        // <div>
        //   {product.images.map(image => {
        //     console.log("blabla", image);
        //     return (
        //       <div>
        //         <img src={image}></img>
        //         <img
        //           className="image"
        //           style={{ backgroundImage: `url(${image})` }}
        //         />
        //       </div>
        //     );
        //   })}
        // </div>
      ))}
    </div>
  );
};

export default ItemByCategory;
