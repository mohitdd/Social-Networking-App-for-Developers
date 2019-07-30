import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";
import Spinner from "../layout/spinner";
import { Link } from "react-router-dom";

const Dashboard = props => {
  useEffect(() => {
    props.getCurrentUserProfile();
  }, []);
  console.log("Values for the props are :" + props.profile.profile);
  return props.profile.loading && props.profile.profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" />
        Welcome {props.auth.user && props.auth.user.name}
      </p>
      {props.profile.profile !== null ? (
        <Fragment>has</Fragment>
      ) : (
        <Fragment>
          <p>You have not setup a profile yet, Please add some Info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentUserProfile }
)(Dashboard);
