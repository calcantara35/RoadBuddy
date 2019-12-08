const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth_middleware = require("../../middleware/auth_middleware");

// models
const Reports = require("../../models/Reports");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

// below is code for image upload using multer, doesnt quite work

// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
//   }
// });

// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
//     // accept a file
//     cb(null, true);
//   } else {
//     // reject file
//     cb(new Error("File was not saved. Incorrect file type!"), false);
//   }
// };

// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5
//   },
//   fileFilter: fileFilter
// });

// stuff above is for image upload, doesnt work atm

// @route   POST api/reports
// @desc    Create report
// @access  Private
router.post(
  "/",
  [
    auth_middleware,
    [
      //checking
      check("text", "Description is required")
        .not()
        .isEmpty()
      // check("img", "Please upload an image showcasing the road condition")
    ]
    // upload.single("img")
  ],
  async (req, res) => {
    // errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // end of errors array logic

    try {
      // we are logged in (since its  private route) so we can find user by id
      const user = await User.findById(req.user.id).select("-password");

      // var for new report
      const newReport = new Reports({
        text: req.body.text,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        user: req.user.id
        // img: req.file.path
      });

      // save to db
      const report = await newReport.save();

      // send db data in json format to client
      res.json(report);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   GET api/reports
// @desc    Get all reports
// @access  Private
router.get("/", auth_middleware, async (req, res) => {
  try {
    // gets all the instances of reports and sorts them from newest to oldest
    const reports = await Reports.find().sort({ date: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/reports/:id
// @desc    Get User report based on id
// @access  Private
router.get("/:id", auth_middleware, async (req, res) => {
  try {
    // find report from db by id passed in params
    const report = await Reports.findById(req.params.id);

    // check to see if report exists
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    res.json(report);
  } catch (err) {
    console.error(err.message);
    // check to see if report id was a valid id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Report not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/reports/:id
// @desc    DELETE User report based on id
// @access  Private
router.delete("/:id", auth_middleware, async (req, res) => {
  try {
    const report = await Reports.findById(req.params.id);

    // check to see if report exists
    if (!report) {
      return res.status(404).json({ msg: "Report not found" });
    }

    // check to see if user deleting post is the user who owns it
    // report.user is an object, so we need to change it to a string to match req.user.id since that is a string
    if (report.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await report.remove();

    // what we return
    res.json({ msg: "Report removed" });
  } catch (err) {
    console.error(err.message);
    // check to see if report id was a valid id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Report not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/reports/like/:id
// @desc    Update User report based on id for likes
// @access  Private
router.put("/like/:id", auth_middleware, async (req, res) => {
  try {
    // get report from db
    const report = await Reports.findById(req.params.id);

    // check if the report has already been liked by current user
    if (
      report.likes.filter(like => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Report already liked" });
    }

    // if the user hasnt already liked it | unshift puts data at beginning of array |
    report.likes.unshift({ user: req.user.id });

    // saving to db
    await report.save();

    // sending the array of likes back into json
    // this sends the id of the like and the user who liked it
    res.json(report.likes);
  } catch (err) {
    console.error(err.message);
    // check to see if report id was a valid id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Report not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/reports/unlike/:id
// @desc    Remove like from report, by user id
// @access  Private
router.put("/unlike/:id", auth_middleware, async (req, res) => {
  try {
    // get report from db
    const report = await Reports.findById(req.params.id);

    // check if the report has already been liked by current user
    if (
      report.likes.filter(like => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Report hasn't been liked yet" });
    }

    // get removed index | gets correct like to remove
    const removeIndex = report.likes
      .map(like => like.user.toString())
      .indexOf(req.user.id);

    // splice out of likes array
    report.likes.splice(removeIndex, 1);

    // saving to db
    await report.save();

    // sending the array of likes back into json
    // this sends the id of the like and the user who liked it
    res.json(report.likes);
  } catch (err) {
    console.error(err.message);
    // check to see if report id was a valid id
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Report not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/reports/comment/:id
// @desc    Update User report based on id for comments
// @access  Private
router.put(
  "/comment/:id",
  [
    auth_middleware,
    [
      //checking
      check("text", "Description is required")
        .not()
        .isEmpty()
      // check("img", "Please upload an image showcasing the road condition")
    ]
    // upload.single("img")
  ],
  async (req, res) => {
    // errors array
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // end of errors array logic

    try {
      // we are logged in (since its  private route) so we can find user by id | we go into the User's model and grab the one based on req.user.id
      const user = await User.findById(req.user.id).select("-password");

      // get report by id
      const report = await Reports.findById(req.params.id);

      // var for new report
      const newComment = {
        text: req.body.text,
        first_name: user.first_name,
        last_name: user.last_name,
        avatar: user.avatar,
        user: req.user.id
      };

      report.comments.unshift(newComment);

      // save to db
      await report.save();

      // send db data in json format to client
      res.json(report.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route   DELETE api/reports/comment/:id/:comment_id
// @desc    Delete a comment based on user id and comment id
// @access  Private
router.delete("/comment/:id/:comment_id", auth_middleware, async (req, res) => {
  try {
    // get report by id
    const report = await Reports.findById(req.params.id);

    // pull out comment from report
    const comment = report.comments.find(
      comment => comment.id === req.params.comment_id
    );

    // make sure comment exists
    if (!comment) {
      return res.status(404).json({ msg: "Comment does not exist" });
    }

    // make sure the user who is deleting the comment made the comment
    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // get removed index | gets correct like to remove
    const removeIndex = report.comments
      .map(comment => comment.user.toString())
      .indexOf(req.user.id);

    // splice out of comments array
    report.comments.splice(removeIndex, 1);

    // saving to db
    await report.save();

    // sending the array of comments back into json
    res.json(report.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
