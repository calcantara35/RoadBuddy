/* 
When you finally pull the updates, run npm install then
to run app, npm run server.
You must do this all in the master branch
To switch branches use: git checkout <branchname> (dont include <>)

once your master branch is updated, do the following steps: 
1) git checkout <yourBranchName>

2) git merge master

*/

//bring in express
const express = require("express");

// bringing in connectDB method from db.js
const connectDB = require("./config/db");

const server = express();

//connect Database
connectDB();

// init middleware | lets us get the data in req.body
server.use(express.json({ extended: false }));

server.get("/", (req, res) => {
  res.send("API Data");
});

// define routes
// this is bringing in the users.js file that has all the user routes
server.use("/api/users", require("./routes/api/users"));
server.use("/api/auth", require("./routes/api/auth"));
server.use("/api/profile", require("./routes/api/profile"));
server.use("/api/reports", require("./routes/api/reports"));

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
