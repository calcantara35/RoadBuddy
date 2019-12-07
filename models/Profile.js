const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  // users and profile should match, this gets user id from mongodb
  user: {
    type: mongoose.Schema.Types.ObjectId,
    // reference to User model
    ref: "user"
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipcode: {
    type: String,
    required: true
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

// exporting and compling Profile schema into a model
module.exports = Profile = mongoose.model("profile", ProfileSchema);
