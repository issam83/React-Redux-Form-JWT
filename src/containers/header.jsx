import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";
import { Link } from "react-router-dom";
import { createStructuredSelector } from "reselect";

import CartIcon from "../components/cart-icon/cart-icon";
import CartDropdown from "../components/cart-dropdown/cart-dropdown";
import { selectCartHidden } from "../redux/selectors/cart.selector";
import { ReactComponent as HomeIcon } from "../assets/home.svg";

import "./header.scss";

const Header = ({ hidden }) => (
  <div className="header">
    <div className="options">
      <Link className="option" to={"/"}>
        <HomeIcon />
      </Link>
      <Link className="option" to={"/shop"}>
        SHOP
      </Link>
      <Link className="option" to={"/contact"}>
        CONTACT
      </Link>
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />}
  </div>
);

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);

// export class Header extends Component {
//   renderAuthentificationLink = () => {
//     if (this.props.isLoggedIn) {
//       return (
//         <li className="nav-item">
//           <Link className="nav-link" to={"/signout"}>
//             Déconnexion
//           </Link>
//         </li>
//       );
//     } else {
//       return [
//         <li key={1} className="nav-item">
//           <Link className="nav-link" to={"/signin"}>
//             Connexion
//           </Link>
//         </li>,
//         <li key={2} className="nav-item">
//           <Link className="nav-link" to={"/signup"}>
//             Inscription
//           </Link>
//         </li>
//       ];
//     }
//   };

//   render() {
//     return (
//       <div>
//         <ul className="nav nav-tabs bg-primary">
//           <li className="nav-item">
//             <Link className="nav-link" to={"/"}>
//               Accueil
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link className="nav-link" to={"/ressources"}>
//               Ressources
//             </Link>
//           </li>
//           {this.renderAuthentificationLink()}
//         </ul>
//       </div>
//     );
//   }
// }

// const mapStateToProps = state => {
//   return {
//     isLoggedIn: state.authentification.isLoggedIn
//   };
// };

// export default connect(mapStateToProps, actions)(Header);

// // export default {Header}
