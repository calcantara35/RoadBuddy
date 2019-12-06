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

server.get("/", (req, res) => {
  res.send("API Data");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
