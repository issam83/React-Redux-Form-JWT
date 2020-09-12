import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShipping } from "../redux/actions/cart-action";
import CheckoutSteps from "../components/checkoutSteps";

function Shipping(props) {
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(saveShipping({ address, country, city, postalCode }));
    props.history.push("/payment");
  };
  return (
    <div>
      <CheckoutSteps step1></CheckoutSteps>
      <div>
        <form onSubmit={submitHandler}>
          <div className="row justify-content-md-center">
            <h1>Livraison</h1>
          </div>
          <div>
            <li className="col-md-4 form-group">
              <label htmlFor="address">Adresse</label>
              <input
                name="address"
                id="address"
                type="text"
                onChange={e => setAddress(e.target.value)}
              />
            </li>
            <li className="col-md-4 form-group">
              <label htmlFor="country">Pays</label>
              <input
                name="country"
                id="country"
                type="text"
                onChange={e => setCountry(e.target.value)}
              />
            </li>
            <li className="col-md-4 form-group">
              <label htmlFor="city">Ville</label>
              <input
                name="city"
                id="city"
                type="text"
                onChange={e => setCity(e.target.value)}
              />
            </li>
            <li className="col-md-4 form-group">
              <label htmlFor="postalCode">Code Postal</label>
              <input
                name="postalCode"
                id="postalCode"
                type="text"
                onChange={e => setPostalCode(e.target.value)}
              />
            </li>
          </div>
          <div className="row justify-content-md-center">
            <button type="submit" className="btn btn-primary btn-raised">
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Shipping;
