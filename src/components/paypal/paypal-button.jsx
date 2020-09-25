// import React from "react";
// import PaypalExpressBtn from "react-paypal-express-checkout";

// export default class PaypalButton extends React.Component {
//   render() {
//     const onSuccess = payment => {
//       // Congratulation, it came here means everything's fine!
//       console.log("The payment was succeeded!", payment);
//       // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
//       this.props.onSuccess(payment)
//     };

//     const onCancel = data => {
//       // User pressed "cancel" or close Paypal's popup!
//       console.log("The payment was cancelled!", data);
//       // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
//       this.props.onCanceled()
//     };

//     const onError = err => {
//       // The main Paypal's script cannot be loaded or somethings block the loading of that script!
//       console.log("Error!", err);
//       // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
//       // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
//       this.props.onError()

//     };

//     let env = "sandbox"; // you can set here to 'production' for production
//     let currency = "USD"; // or you can set this value from your props or state
//     let total = this.props.toPay; // same as above, this is the total amount (based on currency) to be paid by using Paypal express checkout
//     // Document on Paypal's currency code: https://developer.paypal.com/docs/classic/api/currency_codes/

//     const client = {
//       sandbox:
//         "AVnHZBEyl8vbPXPIaVs4qLaKqv1qbUcmq4HYc5hwZW8NcSpc3xuWHarPf7DrTP5-dn2hkDCAGbdiLrWC",
//       production: "YOUR-PRODUCTION-APP-ID"
//     };

//     // sb-tnya43288099@personal.example.com
//     // $d.2=86U

//     // In order to get production's app-ID, you will have to send your app to Paypal for approval first
//     // For sandbox app-ID (after logging into your developer account, please locate the "REST API apps" section, click "Create App"):
//     //   => https://developer.paypal.com/docs/classic/lifecycle/sb_credentials/
//     // For production app-ID:
//     //   => https://developer.paypal.com/docs/classic/lifecycle/goingLive/

//     // NB. You can also have many Paypal express checkout buttons on page, just pass in the correct amount and they will work!
//     return (
//       <PaypalExpressBtn
//         env={env}
//         client={client}
//         currency={currency}
//         total={total}
//         onError={onError}
//         onSuccess={onSuccess}
//         onCancel={onCancel}
//         style={{
//           size: "large",
//           color: "blue",
//           shape: "rect",
//           label: "checkout"
//         }}
//       />
//     );
//   }
// }

import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Axios from "axios";

function PaypalButton(props) {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = async () => {
    const result = await Axios.get("http://localhost:9000/config/paypal");
    const clientID = result.data;
    const script = document.createElement("script");
    script.type = 'text/javascript';
    script.src = "https://www.paypal.com/sdk/js?client-id=" + clientID;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    document.body.appendChild(script);
  };

  const createOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: props.amount
          }
        }
      ]
    });

  const onApprove = (data, actions) =>
    actions.order
      .capture()
      .then(details => props.onSuccess(data, details))
      .catch(err => console.log(err));

  useEffect(() => {
    if (!window.paypal) {
      addPaypalSdk();
    }
    return () => {
      //
    };
  }, []);

  if (!sdkReady) {
    return <div>Loading...</div>;
  }

  const Button = window.paypal.Buttons.driver("react", { React, ReactDOM });

  return (
    <Button
      {...props}
      createOrder={(data, actions) => createOrder(data, actions)}
      {...props}
      onApprove={(data, actions) => onApprove(data, actions)}
    />
  );
}

export default PaypalButton;
