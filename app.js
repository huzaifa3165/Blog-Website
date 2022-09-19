const express = require("express");
const bodyParser = require("body-parser");
const data = require(__dirname + "/data.js");
const lodash = require("lodash");
const app = express();
const port = 3000;
const posts = [];
// store all blogs in an on object which have the specific number of blog and value is a list or object with the blog
// retrieve the blog number and use it as the route in app.get to show it

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { arrayOfPosts: posts });
});
app.get("/about", function (req, res) {
  const otherPagesData = data.getOthers();
  res.render("others", {
    heading: otherPagesData.about[0],
    paragraph: otherPagesData.about[1],
  });
});
app.get("/contact", function (req, res) {
  const otherPagesData = data.getOthers();
  res.render("others", {
    heading: otherPagesData.contact[0],
    paragraph: otherPagesData.contact[1],
  });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.get("/post/:postID", function (req, res) {
  let postTitle, postBody;
  posts.forEach(function (post) {
    if (lodash.lowerCase(post.title) === lodash.lowerCase(req.params.postID)) {
      postTitle = post.title;
      postBody = post.post;
    }
  });
  if (postTitle) {
    res.render("post", { heading: postTitle, paragraph: postBody });
  } else {
    res.send("404 Error");
  }
});

app.post("/compose", function (req, res) {
  const blogObject = {
    title: req.body.title,
    post: req.body.post,
  };
  posts.push(blogObject);
  res.render("submitted");
});

app.listen(port, function () {
  console.log(`Server Running At The Port ${port}`);
});
