import express from "express";
import { title } from "process";

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const port = 3000;
var blogPost = [];
var count = 0

app.get("/" , (req, res) => {
    console.log("rendered home page");
    res.render("index.ejs");
});

app.post("/blog", (req, res) => {
    if(req.body["author"] && req.body["blog"] && req.body["title"]) {
        console.log(req.body["title"]);
        console.log(req.body["author"]);
        console.log(req.body["blog"]);
        count += 1;
        blogPost.push({id: count, blog: req.body["blog"], author: req.body["author"], title: req.body["title"]});
        res.render("index.ejs", {done: 1, blogDetails: blogPost});
    }
    console.log(blogPost);
}); 

app.get("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    var posts = blogPost[postId - 1];
    res.render("edit.ejs", {posts});
});

app.post("/edit/:id", (req, res) => {
    const postId = parseInt(req.params.id);
    blogPost[postId -1].title = req.body.title;
    blogPost[postId-1].blog = req.body.content;

    res.redirect("/"); // Redirect back to the homepage
});

app.listen(port , () => {
    console.log("Server started at part: " + port);
});