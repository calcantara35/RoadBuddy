// mongo db connection
const mongoose = require("mongoose");
const config = require("config");

// using config to bring in mongoURI value from default.json file
const db = config.get("mongoURI");

// using async await here. always wrap logic inside try catch block
const connectDB = async () => {
  try {
    // this begins the DB connection. "mongoose.connect(db)" returns a promise so you put await before it
    // reason for useNewUrlParser, useUnifiedTopology, useCreateIndex is because without them you get a deprecation wanring. MongoDB standard
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    //Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
