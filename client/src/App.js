import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/routing/PrivateRoute";

// redux store
import { Provider } from "react-redux";
import store from "./store";

// bring in setAuthToken
import setAuthToken from "./utils/set_Auth_Token";

// load user action
import { loadUser } from "./actions/auth";

import "./App.css";

// check ls for token, if there is one, call ultis function setAuthToken | sets header
// Needs to be here for it to run again globally
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  // useEffect is similar to componentDidMount, but its the React Hooks version
  useEffect(() => {
    // since we have access to the store, we can call dispatch and pass in loadUser
    // this is basically accessing the loadUser action, and the USER_LOADED type gets called and performs its logic
    /* you need the second param of dispatch [] for it to only run once This tells React that your effect doesn’t depend on any values from props or state, so it never needs to re-run.
    https://reactjs.org/docs/hooks-effect.html */
    store.dispatch(loadUser());
  }, []);

  return (
    // Router and Provider needs to be wrapped around everything for it to work
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          {/* Section here with class name of conatiner because of style purposes */}
          <section className="container">
            <Alert />
            {/* switch makes it easier for private routes */}
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            {/* https://reacttraining.com/react-router/web/guides/quick-start */}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
