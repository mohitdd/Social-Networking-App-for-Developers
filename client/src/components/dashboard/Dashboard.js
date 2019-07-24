import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";

const Dashboard = props => {
  useEffect(() => {
    props.getCurrentUserProfile();
  }, []);
  return <div>Dashboard</div>;
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(Dashboard);
