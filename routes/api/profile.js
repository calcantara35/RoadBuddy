const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const auth_middleware = require("../../middleware/auth_middleware");

// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth_middleware, async (req, res) => {
  try {
    // findOne({user}) pretains to the Profile Model that has the user object in it and gives it the token from req.user.id
    // populate lets you add things to inital query, in this case user's name and avatar
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate("user", ["name", "avatar"]);

    // if there isnt a profile
    if (!profile) {
      return res
        .status(400)
        .json({ msg: "There is no profile for this user." });
    }

    //if there is a profile, send the profile in json format
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
