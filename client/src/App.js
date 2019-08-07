import React, { Fragment, useEffect } from "react";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import register from "./components/auth/register";
import login from "./components/auth/login";
import { Provider } from "react-redux";
import store from "./store";
import Alert from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { loadUser } from "./actions/auth";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";

if (localStorage.token) {
  console.log("I am called to set a token");
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route path="/" exact component={Landing} />
          <section className="container">
            <Alert />
            <Route path="/register" exact component={register} />
            <Route path="/login" exact component={login} />
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/create-profile" exact component={CreateProfile} />
            <Route path="/edit-profile" exact component={EditProfile} />
            <Route path="/add-experience" exact component={AddExperience} />
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
