//This will do the things like getting a JWT and authenticate the user
//Handle the things like registering a user or adding the user

const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/auth");
const exampleUser = require("../../models/User");

//@route    GET api/Auth
//@desc     Test route
//@access   Public

router.get("/", middleware, async (req, res) => {
  try {
    const user = await exampleUser.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500);
  }
});

module.exports = router;
