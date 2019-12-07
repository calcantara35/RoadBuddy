const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // users and profile should match, this gets user id from mongodb
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // reference to User model
    ref: "user"
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: String
  },
  bio: {
    type: String
  },
  social: {
    twitter: {
      type: String
    },
    facebook: {
      type: String
    },
    linkedin: {
      type: String
    },
    instagram: {
      type: String
    }
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
