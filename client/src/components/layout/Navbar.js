import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const Navbar = props => {
  const profileLinks = (
    <ul>
      <li>
        <Link to="/dashboard">
          <i class="fas fa-user" />
          {""}
          Dashboard
        </Link>
      </li>
      <li>
        <a onClick={props.logout} href="#!">
          <i class="fas fa-sign-out-alt" />
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/">
          <i className="fa fa-code" />
          DevConnector
        </Link>
      </h1>
      {props.auth.isAuthenticated ? profileLinks : guestLinks}
    </nav>
  );
};

const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
