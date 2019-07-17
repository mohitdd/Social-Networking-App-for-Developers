import React, { Fragment, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

const Register = props => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onSubmit = async e => {
    e.preventDefault();
    if (formData.password === formData.password2) {
      props.register({ name, email, password });
    } else {
      props.setAlert("Passwords Don't match", "danger");
    }
  };
  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user" /> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            id="name"
            onChange={e => {
              console.log({ ...formData });
              setFormData({
                ...formData,
                name: document.getElementById("name").value
              });
            }}
          />
        </div>
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
              console.log(
                "The name is :" + document.getElementById("name").value
              );
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
            id="password"
            onChange={e => {
              setFormData({
                ...formData,
                password: document.getElementById("password").value
              });
              console.log(
                "The name is :" + document.getElementById("password").value
              );
            }}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            id="password2"
            onChange={e => {
              setFormData({
                ...formData,
                password2: document.getElementById("password2").value
              });
              console.log(
                "The name is :" + document.getElementById("password2").value
              );
            }}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default connect(
  null,
  { setAlert, register }
)(Register);
