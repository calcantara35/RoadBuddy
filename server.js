const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.send("API Data");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
