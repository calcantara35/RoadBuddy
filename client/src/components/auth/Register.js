import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
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
      console.log("Passwords do not match");
    } else {
      // creating an instance of a new user with the form data
      const newUser = {
        first_name,
        last_name,
        email,
        password
      };
      try {
        // we need this config object to pass in the headers
        // this is used within axios, it is one of the params you can send
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };

        // for the req, body that will have stringified the newUser object
        const body = JSON.stringify(newUser);

        //getting the response | can do /api/users because we added proxy in package.json file | pass in body and config
        const res = await axios.post("/api/users", body, config);
        // returns token
        console.log(res.data);
      } catch (err) {
        if (err) throw err;
      }
    }
  };

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
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Last Name"
            name="last_name"
            value={last_name}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
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
            minLength="6"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={e => onChange(e)}
            minLength="6"
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

export default Register;
