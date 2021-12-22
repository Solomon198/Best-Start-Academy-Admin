import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider as StyletronProvider, DebugEngine } from "styletron-react";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider } from "react-redux";
import reduxConfig from "./configs/store";
import { PersistGate } from "redux-persist/integration/react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AuthRoute from "./screens/auth.route";
import UserDashboard from "./screens/user/user.dashboard";
import { useSelector } from "react-redux";
import Config from "./configs/env.config";
import firebase from "firebase/app";
import "@devexpress/dx-react-chart-bootstrap4/dist/dx-react-chart-bootstrap4.css";

let { store, persistor } = reduxConfig();

function RouteConfig() {
  const { accessToken } = useSelector((state: any) => ({
    accessToken: state.Auth.accessToken,
  }));
  useEffect(() => {
    firebase.initializeApp(Config().FIREBASE_CONFIG);
  }, []);

  return (
    <Router>
      <Switch>
        {/* <Route exact path="/" component={App} /> */}
        <Route path="/dashboard">
          {!accessToken ? (
            <AuthRoute />
          ) : (
            <Route path="/dashboard" component={UserDashboard} />
          )}
        </Route>
        <Route path="/">
          {accessToken ? <Redirect to="/dashboard" /> : <AuthRoute />}
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

const debug =
  process.env.NODE_ENV === "production" ? void 0 : new DebugEngine();

// 1. Create a client engine instance
const engine = new Styletron();

ReactDOM.render(
  <div id="container">
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <React.StrictMode>
          <StyletronProvider value={engine} debug={debug} debugAfterHydration>
            <RouteConfig />
          </StyletronProvider>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  </div>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
