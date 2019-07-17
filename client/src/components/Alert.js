import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = props => {
  return <div />;
};

alert.propTypes = {};

const mapStateToProps = state => ({
  alerts: state.alert
});

export default connect()(alert);
