import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Header from "../src/containers/header";
import Ressources from "./components/ressources";
import Home from "./pages/home";
import ItemByCategory from "./pages/itemByCategory";
import Contact from "./pages/contact";
import ShopScreen from "./pages/shop";
import CheckoutPage from "./pages/checkout";
import Signout from "./components/signout";
import Signup from "./components/signup";
import Errors from "./components/errors";
import ItemScreen from "./pages/item";
import SignIn from "./components/signin";
import Shipping from "./pages/shipping";
import Payment from "./pages/payment";
import PlaceOrder from "./pages/placeOrder";
require("../src/style.css");

// <Route
//   exact
//   path="/ressources"
//   component={RequireAuthentification(Ressources)}
// />

const Routes = () => {
  return (
    <div>
      <BrowserRouter>
        <div className="container body_content">
          <Header />
          <Errors />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/category/:id" component={ItemByCategory} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/shop" component={ShopScreen} />
            <Route path="/shop/:id" component={ItemScreen} />
            <Route path="/checkout/:id?" component={CheckoutPage} />
            <Route exact path="/ressources" component={Ressources} />
            <Route exact path="/shipping" component={Shipping} />
            <Route exact path="/payment" component={Payment} />
            <Route exact path="/placeorder" component={PlaceOrder} />

            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signout" component={Signout} />
            <Route exact path="/signup" component={Signup} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default Routes;
