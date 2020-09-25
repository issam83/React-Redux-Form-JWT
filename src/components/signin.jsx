import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signin, login } from "../redux/actions/user-action";

const SignIn = props => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userSignin = useSelector(state => state.userSignin);
  const { loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();

  useEffect(() => {
    if (userInfo) {
      props.history.push("/panel");
    }
    return () => {
      //
    };
  }, [userInfo]);

  const submitHandler = e => {
    e.preventDefault();
    dispatch(signin(email, password));
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="row justify-content-md-center">
        <h1>Connexion</h1>
      </div>
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}
      <div className="row justify-content-md-center">
        <fieldset className="col-md-4 form-group">
          <label className="bmd-label-floating">Email</label>
          <input
            name="email"
            component="input"
            type="text"
            className="form-control"
            onChange={e => setEmail(e.target.value)}
          />
        </fieldset>
      </div>
      <div className="row justify-content-md-center">
        <fieldset className="col-md-4 form-group">
          <label className="bmd-label-floating">Password</label>
          <input
            name="password"
            component="input"
            type="password"
            className="form-control"
            onChange={e => setPassword(e.target.value)}
          />
        </fieldset>
      </div>
      <div className="row justify-content-md-center">
        <button type="submit" className="btn btn-primary btn-raised">
          Valider
        </button>
      </div>
    </form>
  );
};

export default SignIn;
