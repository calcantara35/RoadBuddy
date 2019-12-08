const mongoose = require("mongoose");

const ReportsSchema = new mongoose.Schema({
  // user connected to his or her reports
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  //   img: {
  //     type: String,
  //     required: true
  //   },
  text: {
    type: String,
    required: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  avatar: {
    type: String
  },
  likes: [
    {
      // which likes came from which user
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      // which likes came from which user
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      },
      text: {
        type: String,
        required: true
      },
      first_name: {
        type: String
      },
      last_name: {
        type: String
      },
      avatar: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Reports = mongoose.model("reports", ReportsSchema);
