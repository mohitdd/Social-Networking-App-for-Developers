import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { Link, Redirect } from "react-router-dom";

const Login = ({ loginUser, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const { email, password } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    loginUser({ email, password });
  };

  if (isAuthenticated) {
    console.log("I am true");
    return <Redirect to="/dashboard" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">SignIn</h1>
      <p className="lead">
        <i className="fas fa-user" /> SignIn to your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            onChange={e => {
              setFormData({
                ...formData,
                email: document.getElementById("email").value
              });
            }}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            id="password"
            onChange={e => {
              setFormData({
                ...formData,
                password: document.getElementById("password").value
              });
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="SignIn" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
