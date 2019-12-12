import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

// need to interact with authstate in auth reducer so...
import { connect } from "react-redux";

// To reference https://reacttraining.com/react-router/core/api/Route/render-func

// for routes, you have to accept a component prop, therefore, we pass in those props for PrivateRoute, it takes in the component, and anything else thats passed into it
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  // this is where we check to see if we are authenticated or not
  //   route takes in whatever params, and then render(which will render whatever comes after it)
  <Route
    {...rest}
    render={props =>
      !isAuthenticated && !loading ? (
        <Redirect to="/login" />
      ) : (
        //   if the user is authenticated and loading is done.. component that is passed in will load
        <Component {...props} />
      )
    }
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
