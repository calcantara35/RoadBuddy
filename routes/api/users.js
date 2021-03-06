const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");

//bring in user model
const User = require("../../models/User");

// @route   POST api/users
// @desc    Register User route
// @access  Public
router.post(
  "/",
  //validation using express-validator
  [
    check("first_name", "First name is required")
      .not()
      .isEmpty(),
    check("last_name", "Last name is required")
      .not()
      .isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters"
    ).isLength({
      min: 6
    })
  ],
  //using async await | everything below is logic for post method register user
  async (req, res) => {
    // checking to see if the credientials were valid
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // you MUST add a return statement to avoid header errors since this is not the last res method
      return res.status(400).json({ errors: errors.array() });
    }

    //destructure
    const { first_name, last_name, email, password } = req.body;

    try {
      // See if user exists | findOne searches by specific prop
      let user = await User.findOne({ email });

      if (user) {
        // you MUST add a return statement to avoid header errors since this is not the last res method
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exisits" }] });
      }

      // using gravatar for image icon instead of uploading an image
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm"
      });

      // create instance of user
      user = new User({
        first_name,
        last_name,
        email,
        avatar,
        password
      });

      // Encrypt password using bcrypt //

      // create a salt to hash it using bcrypt.genSalt(pass in rounds, more rounds you have the better, security and speed reasons, based on documentation). Also it returns a promise so using async await
      const salt = await bcrypt.genSalt(10);

      // take user password and hash it(takes in password and the salt created from above)
      user.password = await bcrypt.hash(password, salt);

      //save user to db
      await user.save();

      // return json web token (user gets logged in right away)

      //JWT
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
