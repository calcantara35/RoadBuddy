const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
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

// @route   POST api/profile/
// @desc    Create or update a user profile
// @access  Private
router.post(
  "/",
  [
    auth_middleware,
    [
      check("address", "Address is required")
        .not()
        .isEmpty(),
      check("city", "City is required")
        .not()
        .isEmpty(),
      check("state", "State is required")
        .not()
        .isEmpty(),
      check("zipcode", "Zip code is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    // error checking
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // pull all fields out from req.body | destructure
    const {
      address,
      city,
      state,
      zipcode,
      bio,
      twitter,
      instagram,
      linkedin,
      facebook
    } = req.body;

    //build profile obj
    const profileFields = {};
    // for user field in Profile Module, it can be done like this
    profileFields.user = req.user.id;

    // rest
    if (address) profileFields.address = address;
    if (city) profileFields.city = city;
    if (state) profileFields.state = state;
    if (zipcode) profileFields.zipcode = zipcode;
    if (bio) profileFields.bio = bio;

    // build social obj
    profileFields.social = {}; // without this, it will give error of social being undefined
    if (twitter) profileFields.social.twitter = twitter;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (facebook) profileFields.social.facebook = facebook;

    try {
      // getting profile and putting it in a var | able to do this thanks to auth_middleware file, look to understand
      let profile = await Profile.findOne({ user: req.user.id });

      //if a user's profile exists
      if (profile) {
        // update | using mongoose method findOneAndUpdate()
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      // create profile
      profile = new Profile(profileFields);

      // saving profile, calling .save() on instance of model
      await profile.save();
      // sending profile
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get("/", async (req, res) => {
  try {
    // accesses Profile Module and populates the query with the User model's name and avatar properties
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);

    // returns profiles in json format
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
router.get("/user/:user_id", async (req, res) => {
  try {
    // accesses Profile Module and populates the query with the User model's name and avatar properties
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);

    if (!profile) {
      return res.status(400).json({ msg: "Profile not found!" });
    }

    // returns profiles in json format
    res.json(profile);
  } catch (err) {
    console.error(err.message);
    // check for a certain type of message
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/profile/user/:user_id
// @desc    Delete profile, user, & post
// @access  Private
router.delete("/", auth_middleware, async (req, res) => {
  try {
    // remove profile | using the middleware we can get the user's id from the req.user
    await Profile.findOneAndRemove({ user: req.user.id });

    // remove user
    await User.findOneAndRemove({ _id: req.user.id });

    // returns profiles in json format
    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    // check for a certain type of message
    if (err.kind === "ObjectId") {
      return res.status(400).json({ msg: "Profile not found!" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
