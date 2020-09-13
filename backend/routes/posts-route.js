const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const router = express.Router();

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  timeStamp: Date,
  user: Object,
  like: Number,
  dislike: Number,
});

const Post = mongoose.model("Post", postSchema);

router.get("/posts", function (req, res) {
  Post.find({})
    .sort("-timeStamp")
    .exec(function (err, posts) {
      if (err) {
        console.log(err);
      } else {
        res.json(posts);
      }
    });
});

router.post("/posts", function (req, res) {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    timeStamp: req.body.timeStamp,
    user: req.body.user,
    like: req.body.like,
    dislike: req.body.dislike,
  });

  post.save(function (err, obj) {
    if (err) res.send(err);

    res.json(obj);
  });
  // console.log(post);
  // res.json(post);
});

router.patch("/posts/:id", function (req, res) {
  // console.log(req.params.id);

  if (req.body.type === "like") {
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      { like: req.body.votes }
    ).then(() => {
      console.log("Update");
    });
  } else if (req.body.type === "dislike") {
    Post.findByIdAndUpdate(
      { _id: req.params.id },
      { dislike: req.body.votes }
    ).then(() => {
      console.log("Update");
    });
  }
});

module.exports = router;
