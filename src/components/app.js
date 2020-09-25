import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../redux/reducers/root-reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "../redux/reducers/root-reducer";
//import { persistStore } from "redux-persist";
import logger from "redux-logger";

// import { PersistGate } from "redux-persist/integration/react";
import { actionCounter } from "../redux/middlewares/action-counter";
import { setAuthentification } from "../redux/actions/user-action";
import setAuthToken from "../helpers/setAuthToken";
import { loadUser } from "../redux/actions/user-action";
import Routes from "../routes";

// const persistor = persistStore(store);

// const token = localStorage.getItem("token");
// if (token) {
//   store.dispatch(setAuthentification(true));
// }

// const invariant = require("redux-immutable-state-invariant").default();

// const createStoreWithMiddleware = applyMiddleware(
//   logger,
//   thunk,
//   actionCounter,
//   invariant
// )(createStore);

// const store = createStoreWithMiddleware(
//   reducers,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// if (localStorage.token) {
//   setAuthToken(localStorage.token);
//}

const App = () => {
  // useEffect(() => {
  //   store.dispatch(loadUser());
  // }, []);
  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
};

export default App;
