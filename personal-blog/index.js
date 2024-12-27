import express, { urlencoded } from "express";
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getNextId, refactorPostId } from './public/javascript/common.js';

// replace this with something more firm later
const adminUsername = "kyle";
const adminPassword = "password";

//---------------------- APP SETUP ----------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
app.use(express.static("public", { 
  extensions: ["css", "js", "html"] 
})); 
app.use(urlencoded({ extended: true }));
//-------------------------------------------------------


// read posts api
// should always be accessed from a script calling readPosts() in ./public/javascript/common.js
app.get("/api/posts", (req, res) => {
  const posts = JSON.parse(readFileSync("./posts.json", "utf-8"));
  res.json(posts);
});

// login page
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username == adminUsername && password == adminPassword) {
    res.redirect("/blog-admin");
  }
  else {
    res.send(`<p>you are not me. quit it!.</p><a href="/">Try again</a>`); 
  }
});

// blog admin page new post form handler
app.post("/newPost", (req, res) => {
  const { name, content } = req.body;

  const posts = JSON.parse(readFileSync("./posts.json", "utf-8"));

  posts.push({
    id: getNextId(posts),
    date: new Date().toLocaleDateString(),
    name: name,
    content: content
  });

  writeFileSync("./posts.json", JSON.stringify(posts, null, 2), "utf-8");

  res.redirect("/blog-admin");
});

// blog admin page edit post form handler
app.post("/editPost", (req, res) => {
  const  { id } = req.body;

  res.redirect(`/edit-post.html?id=${id}`);
});

app.post("/editPostComplete", (req, res) => {
  const { id, name, content } = req.body;

  console.log({id: id, name: name, content: content});

  const posts = JSON.parse(readFileSync("./posts.json", "utf-8"));

  for (const post of posts) {
    if (post.id == id) {
      post.name = name;
      post.content = content;
    }
  }

  writeFileSync("./posts.json", JSON.stringify(posts, null, 2), "utf-8");

  res.redirect("/blog-admin");
})

// blog admin page delete post form handler
app.post("/deletePost", (req, res) => {
  const { id } = req.body;

  let posts = JSON.parse(readFileSync("./posts.json", "utf-8"));
  posts = posts.filter((post) => post.id != id);

  posts = refactorPostId(posts, id);

  writeFileSync("./posts.json", JSON.stringify(posts, null, 2), "utf-8");

  res.redirect("/blog-admin");
});

// the blog homepage (default page)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

// to redirect to the blog homepage
app.get("/blog.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

// the blog admin page
app.get("/blog-admin", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog-admin.html");
});

// to redirect to the blog admin page
app.get("/blog-admin.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog-admin.html");
});

// individual blog post page
app.get("/post.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/post.html");
});

app.get("/edit-post.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/edit-post.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});