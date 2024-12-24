import express, { urlencoded } from 'express';
import { writeFileSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// replace this with something more firm later
const adminUsername = "kyle";
const adminPassword = "password";


//----------------- APP SETUP---------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const port = 3000; // You can choose any available port
app.use(express.static('public', { 
  extensions: ['css', 'js', 'html'] 
})); 
app.use(urlencoded({ extended: true }));
//------------------------------------------------------

// the blog homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

app.get("/api/posts", (req, res) => {
  const posts = JSON.parse(readFileSync("./posts.json", "utf-8"));
  res.json(posts);
});

// Route for the form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username == adminUsername && password == adminPassword) {
    res.redirect("/blog-admin");
  }
  else {
    // Stay on the same page (blog.html) and display an error message (example)
    res.send(`<p>you are not me. quit it!.</p><a href="/">Try again</a>`); 
  }
});

app.get('/blog-admin', (req, res) => {
  res.sendFile(__dirname + "/public/html/blog-admin.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});