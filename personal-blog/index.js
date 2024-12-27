import express, { urlencoded } from "express";
import { writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { getNextId, refactorPostId } from './public/javascript/common.js';

// replace this with something more firm later
const adminUsername = "kyle";
const adminPassword = "password";

//----------------- APP SETUP---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000;
app.use(express.static("public", { 
  extensions: ["css", "js", "html"] 
})); 
app.use(urlencoded({ extended: true }));
//------------------------------------------------------

// the blog homepage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

app.get("/api/posts", (req, res) => {
  const posts = JSON.parse(readFileSync("./posts.json", "utf-8"));
  res.json(posts);
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username == adminUsername && password == adminPassword) {
    res.redirect("/blog-admin");
  }
  else {
    res.send(`<p>you are not me. quit it!.</p><a href="/">Try again</a>`); 
  }
});

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

app.post("/editPost", (req, res) => {
  const  { id } = req.body;
  console.log(id);

  res.redirect("/blog-admin");
});

app.post("/deletePost", (req, res) => {
  const { id } = req.body;
  console.log(id);

  let posts = JSON.parse(readFileSync("./posts.json", "utf-8"));
  posts = posts.filter((post) => post.id != id);

  posts = refactorPostId(posts, id);

  writeFileSync("./posts.json", JSON.stringify(posts, null, 2), "utf-8");

  res.redirect("/blog-admin");
});

app.get("/blog-admin", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog-admin.html");
});

app.get("/post.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/post.html");
});

app.get("/blog.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});