const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth_middleware = require("../../middleware/auth_middleware");

// @route   GET api/auth
// @desc    Test route
// @access  Public
// putting in auth_middleware makes this route protected
router.get("/", auth_middleware, async (req, res) => {
  try {
    // returns user data based on the jwt that was passed in the header since the user data is in the request object
    // select will exclude what to display, for this case we dont want the user's password or else its a security vulnerability
    const user = await User.findById(req.user.id).select("-password");

    // sending json data as the response
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/auth
// @desc    authenticate user and get jwt to make request to private              routes
// @access  Public
router.post(
  "/",
  //validation using express-validator
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists()
  ],
  //using async await for promises | everything below is logic for post method login user
  async (req, res) => {
    // checking to see if the credientials were valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // you MUST add a return statement to avoid header errors since this is not the last res method
      return res.status(400).json({ erros: errors.array() });
    }

    //destructure
    const { email, password } = req.body;

    try {
      // finding specific user from db based on email | findOne searches by specific prop
      let user = await User.findOne({ email });

      if (!user) {
        // you MUST add a return statement to avoid header errors since this is not the last res method
        return res
          .status(400)
          .json({ errors: [{ msg: "Email and password are not correct." }] });
      }

      // match email and password | bcrypt has a message called compare which takes in a plain text password and encrypted password and compares them to see if its a match or not

      // user.password is from the var user above that contains all of the user's data from the db; therefore, we can use user.password because that password is encrypted

      //   compare() returns a promise so await is used here
      const pwIsMatch = await bcrypt.compare(password, user.password);

      // if password do not match
      if (!pwIsMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      // return json web token (user gets logged in right away)

      // payload is what we are sending to the jwt
      const payload = {
        subject: {
          // do not have to do _id because mongoose uses an abstraction of _id
          id: user.id
        }
      };

      // needs payload | secret(put in default.json file) | options: expiresIn (format in ms), callback(possible err and the jwtToken)
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
