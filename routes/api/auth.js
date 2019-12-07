const express = require("express");
const router = express.Router();
const User = require("../../models/User");
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

module.exports = router;
