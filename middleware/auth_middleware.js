const jwt = require("jsonwebtoken");
const config = require("config");

// middleware function is basiclaly a function that ahs access to req and res objects and next is a call back that we have to run once we are done, so it proceeds to the next possible middleware
module.exports = (req, res, next) => {
  // get token from header to access protected routes
  const token = req.header("x-auth-token");

  // check if no token is there
  if (!token) {
    return res
      .status(401)
      .json({ msg: "No token found, authorization denied" });
  }

  // verify token if there is one
  try {
    // decoding token if found | verify takes in token and secret from default.json
    const decodedJWT = jwt.verify(token, config.get("jwtSecret"));

    // now we take the request object and assign a value to user
    // which will be the decoded payload since the token has subject in the payload with the user id from mongodb
    req.user = decodedJWT.subject;

    //once logic for middleware is done, call next
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
