import express, { urlencoded } from 'express';
import { writeFile } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const adminUsername = "kyle";
const adminPassword = "password";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000; // You can choose any available port

app.use(express.static('public', { 
  extensions: ['css', 'js', 'html'] 
})); 

// Middleware to parse form data
app.use(urlencoded({ extended: true }));

// Serve the HTML form
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/public/html/blog.html");
});

// Route for the form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username == adminUsername && password == adminPassword) {
    res.redirect("/blog-admin");
  }
  else {
    // Stay on the same page (blog.html) and display an error message (example)
    res.send(`<p>Invalid username or password.</p><a href="/">Try again</a>`); 
  }
});

app.get('/blog-admin', (req, res) => {
  res.sendFile(__dirname + "/public/html/blog-admin.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});