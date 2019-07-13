import React, { Fragment, useState } from "react";

const Login = () => {
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
      const newUser = {
        password,
        email
      };
    }
  };
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
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <a href="login.html">Sign In</a>
      </p>
    </Fragment>
  );
};

export default Login;
