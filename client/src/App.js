import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import "./App.css";

const App = () => (
  // Router needs to be wrapped around everything for it to work
  <Router>
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      {/* Section here with class name of conatiner because of style purposes */}
      <section className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
        </Switch>
      </section>
    </Fragment>
  </Router>
);

export default App;
