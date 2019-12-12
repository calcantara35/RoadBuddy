// fetch all data with action and bring it in from redux state and pass it down to other components
import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentUserProfile } from "../../actions/profile";

const Dashboard = ({ getCurrentUserProfile, auth, profile }) => {
  useEffect(() => {
    getCurrentUserProfile();
  }, []);

  return (
    <Fragment>
      <h1 class="large text-primary">Dashboard</h1>
      <p class="lead">
        <i class="fas fa-user"></i> Welcome John Doe
      </p>
      <div class="dash-buttons">
        <Link to="#!" class="btn btn-light">
          <i class="fas fa-user-circle text-primary"></i> Edit Profile
        </Link>
      </div>

      <div class="my-2">
        <button class="btn btn-danger">
          <i class="fas fa-user-minus"></i>
          Delete My Account
        </button>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentUserProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(mapStateToProps, { getCurrentUserProfile })(Dashboard);
