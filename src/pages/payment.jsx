import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { savePayment } from "../redux/actions/cart-action";
import CheckoutSteps from "../components/checkoutSteps";

function Payment(props) {
  const [paymentMethod, setPaymentMethod] = useState("");

  const dispatch = useDispatch();

  const submitHandler = e => {
    e.preventDefault();
    dispatch(savePayment({ paymentMethod }));
    props.history.push("/placeorder");
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div>
        <form onSubmit={submitHandler}>
          <div className="row justify-content-md-center">
            <h1>Payment</h1>
          </div>
          <li className="col-md-4 form-group">
            <input
              type="radio"
              name="paymentMethod"
              id="paymentMethod"
              value="paypal"
              onChange={e => setPaymentMethod(e.target.value)}
            ></input>
            <label htmlFor="paymentMethod">Paypal</label>
          </li>
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

export default Payment;
