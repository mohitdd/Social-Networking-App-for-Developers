import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const privateroute = ({ component: Component, ...rest }) => {
  return <div />;
};

privateroute.propTypes = {};

const mapStateToProps = state => {
  auth = state.auth;
};

export default connect(mapStateToProps)(privateroute);
