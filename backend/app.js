const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts-route");

const app = express();
app.use(cors({ origin: "*" }));

app.use(bodyParser.json());
app.use(postsRoutes);

mongoose.connect("mongodb://localhost:27017/pollDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.listen(5000, function (req, res) {
  console.log("Server is up and running!!!");
});
