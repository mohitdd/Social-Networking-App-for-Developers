import React, { Fragment } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import register from "./components/auth/register";
import login from "./components/auth/login";
import { Provider } from "react-redux";
import store from "./store";

const App = () => (
  <Provider store={store}>
    <Router>
      <Fragment>
        <Navbar />
        <Route path="/" exact component={Landing} />
        <section className="container">
          <Route path="/register" exact component={register} />
          <Route path="/login" exact component={login} />
        </section>
      </Fragment>
    </Router>
  </Provider>
);

export default App;
