import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <a onClick={logout} href="!#">
          <i className="fas fa-sign-out-alt"></i>{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guessLinks = (
    <ul>
      <li>
        <Link to="/users">Users</Link>
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
          <i className="fas fa-road"></i> RoadBuddy
        </Link>
      </h1>
      {/* if we are done loading... */}
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guessLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  // action
  logout: PropTypes.func.isRequired,
  // state,
  auth: PropTypes.object.isRequired
};

// this is essentially the state param you pass into connect
const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
