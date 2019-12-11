import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Road Buddy</h1>
          <p className="lead">
            Drive worry free with our application. Users will report road
            conditions that Weather Channels can't! This is what we call a
            united community
          </p>
          <div className="buttons">
            <Link to="/login" className="btn btn-primary">
              Sign Up
            </Link>
            <Link to="/register" className="btn btn-light">
              Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
