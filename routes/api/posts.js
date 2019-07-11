//Handle the things like registering a user and adding the user

const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator/check");

const User = require("../../models/User");
const Post = require("../../models/posts");

//@route    POST api/posts
//@desc     Create a Post
//@access   Private

router.post(
  "/",
  [
    auth,
    [
      check("text", "Text field is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ message: errors.array() });
    }

    try {
      var user = await User.findById(req.user.id).select("-password");
      var newPost = new Post({
        user: user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar
      });

      const post = await newPost.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
    }
  }
);

//@route    GET api/posts
//@desc     Get all posts
//@access   Private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find({ user: req.user.id });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route    GET api/posts/:id
//@desc     GET posts by id
//@access   Private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400).json({ msg: "Post not found by this Id" });
    }
    res.send(post);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route   DELETE api/posts/:id
//@desc    Delete a Post
//@access  Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(404).send("Post does not exist");
    }

    //We have to see wheather the same user is deleting the post or not
    if (post.user.toString() !== req.user.id) {
      res.status(401).send("User not authorized");
    }

    await post.remove();
    res.json({ msg: "Post is removed" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

//@route    PUT api/posts/like/:id
//@desc     Like a post
//@access   private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    //check the post is already been liked or not
    if (
      post.likes.filter(item => like.user.toString() === req.user.id).length > 0
    ) {
      res.status(400).send("Post is already liked by the user");
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
