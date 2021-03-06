import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

//connect this component with redux
import { connect } from "react-redux";

// import action
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";

// bring in proptypes
import PropTypes from "prop-types";

const Register = ({ setAlert, register, isAuthenticated }) => {
  // 1) bring in useState | taking care of form state | [state, action]
  const [userFormData, setUserFormData] = useState({
    //  default values
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  //  2) pull name and email, etc out | destructure here
  const {
    first_name,
    last_name,
    email,
    password,
    passwordConfirm
  } = userFormData;

  // 3) associate values that were pulled out from the state, to the form inputs "value={first_name}"

  // 4) you need an onchange handler when utilizing forms or it wont let you type anything into the inputs. Debugged for 10 minutes to find out lol

  //   5) onChange method | call setUserFormData and change state
  // 6) in order to only have to write this code out once, I used the name="whatever it was in the form" value as the key, therefore, it will change each value
  const onChange = e =>
    setUserFormData({ ...userFormData, [e.target.name]: e.target.value });

  // handle the form submission
  const onSubmit = async e => {
    // if this isnt here it will act as we are submitting a file
    e.preventDefault();
    if (password !== passwordConfirm) {
      // this will send a msg and alertType to actions and use method
      setAlert("Passwords do not match. Please try again.", "danger");
    } else {
      register({ first_name, last_name, email, password });
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/timeline" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="First Name"
            name="first_name"
            value={first_name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
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
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

// these actions get passed in as props, so this step is required
Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

// bringing in auth state to specific component
const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

// https://react-redux.js.org/using-react-redux/connect-mapdispatch
// this is how components can access the store, by using connect
export default connect(mapStateToProps, { setAlert, register })(Register);
