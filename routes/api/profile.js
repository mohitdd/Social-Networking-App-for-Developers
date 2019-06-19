//Handle the things like registering a user and adding the user

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/profile");
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");

//@route    GET api/profile/me
//@desc     Get Current Users Profile
//@access   Private

router.get("/me", auth, async (req, res) => {
  try {
    console.log(req);
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name", "avatar"]
    );

    if (!profile) {
      res.status(400).json({ message: "There is no profile for this user" });
    } else {
      res.json(profile);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/profile
//@desc     Create or update a user profile
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("status", "Status is Required")
        .not()
        .isEmpty()
    ],
    check("skills", "Skills is Required")
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    const {
      company,
      website,
      location,
      status,
      skills,
      bio,
      githubusername,
      facebook,
      instagram,
      linkedIn,
      youtube,
      twitter
    } = req.body;
    console.log(req.body);
    //Build profile objcet

    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(",").map(skill => skill.trim());
    }

    //Build Social Object
    profileFields.social = {};
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (instagram) profileFields.social.instagram = instagram;
    if (linkedIn) profileFields.social.linkedIn = linkedIn;
    if (youtube) profileFields.social.youtube = youtube;

    try {
      console.log("req is coming here");
      let profile = await Profile.findOne({ user: req.user.id });
      console.log(profile);
      if (profile) {
        //Update the profile
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );
        return res.json(profile);
      }

      //Create a new profile if it doesn't exists
      profile = new Profile(profileFields);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route    GET api/profile
// @desc     Get all profiles
// @access   Public

router.get("/", async (req, res) => {
  try {
    const profiles = await Profile.find().populate("user", ["name", "avatar"]);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route    GET api/profile
// @desc     Get a user profile
// @access   Public

router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id
    }).populate("user", ["name", "avatar"]);
    if (!profile) {
      res.status(400).send("There is no profile with this User");
    }
    res.json(profile);
  } catch (err) {
    if (err.kind === "ObjectId") {
      res.status(400).send("There is no profile with this User: " + err.kind);
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
