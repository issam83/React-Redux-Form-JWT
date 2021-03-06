import React, { Component } from "react";
import { connect } from "react-redux";

export default function(ChildComponent) {
  class RequireAuthentification extends Component {
    componentWillMount() {
      if (!this.props.isLoggedIn) {
        this.props.history.push("/ressources");
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isLoggedIn) {
        this.props.history.push("/ressources");
      }
    }

    render() {
      return this.props.isLoggedIn && <ChildComponent />;
    }
  }

  const mapDispatchToProps = state => ({
    isLoggedIn: state.authentification.isLoggedIn
  });

  return connect(mapDispatchToProps)(RequireAuthentification);
}
