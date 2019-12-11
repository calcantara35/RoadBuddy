import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  // 1) bring in useState | taking care of form state | [state, action]
  const [loginFormData, setLogin] = useState({
    //  default values
    email: "",
    password: ""
  });

  //  2) pull password and email | destructure here
  const { email, password } = loginFormData;

  // 3) associate values that were pulled out from the state, to the form inputs "value={first_name}"

  // 4) you need an onchange handler when utilizing forms or it wont let you type anything into the inputs. Debugged for 10 minutes to find out lol

  //   5) onChange method | call setUserFormData and change state
  // 6) in order to only have to write this code out once, I used the name="whatever it was in the form" value as the key, therefore, it will change each value
  const onChange = e => {
    setLogin({ ...loginFormData, [e.target.name]: e.target.value });
  };

  // handle the form submission
  const onSubmit = async e => {
    // if this isnt here it will act as we are submitting a file
    e.preventDefault();
    console.log("success");
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
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
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
};

export default Login;
