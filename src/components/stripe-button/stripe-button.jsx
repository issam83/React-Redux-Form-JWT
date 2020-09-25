import React from "react";
import { useSelector } from "react-redux";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = () => {
  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  const priceForStripe = cartItems.price * 100;
  console.log(cartItems);
  const publishableKey = "pk_test_iJGbNj53egp7mR1Z28HWm78D00ilwfHyo1";

  const onToken = token => {
    console.log(token);
    alert("Payment Successful");
  };
  return (
    <div>
      {cartItems.map(item => {
        return (
          <StripeCheckout
            label="Pay Now"
            name="E-clothes Ltd."
            billingAddress
            shippingAddress
            //image="https://svgshare.com/i/CUz.svg"
            description={`Your total is ${item.quantity * item.price}$`}
            amount={priceForStripe}
            panelLabel="Pay Now"
            token={onToken}
            stripeKey={publishableKey}
          />
        );
      })}
    </div>
  );
};

export default StripeCheckoutButton;
