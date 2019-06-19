//This will do the things like getting a JWT and authenticate the user
//Handle the things like registering a user or adding the user

const express = require("express");
const router = express.Router();
const middleware = require("../../middleware/auth");
const exampleUser = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

//@route    GET api/Auth
//@desc     Test route
//@access   Public

router.get("/", middleware, async (req, res) => {
  try {
    const user = await exampleUser.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    POST api/auth
//@desc     Authenticate a user and returns token
//@access   Public

router.post(
  "/",
  [
    check("email", "Please enter a valid email id").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more chracetrs"
    ).isLength({ min: 6 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    //Validation is passed
    const { email, password } = req.body;
    //See if the user exists
    try {
      var user = await User.findOne({ email });
      console.log(user);
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      var isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
