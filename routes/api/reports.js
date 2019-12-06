const express = require("express");
const router = express.Router();

// @route   GET api/reports
// @desc    Test route
// @access  Public
router.get("/", (req, res) => {
  res.send("Reports Route");
});

module.exports = router;
