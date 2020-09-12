import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../redux/actions";

export class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return <div>Aurevoir</div>;
  }
}

export default connect(null, actions)(Signout);
