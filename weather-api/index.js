// need express to set up the local host
// need urlencoded to pass information from webpages to backend
import express, { urlencoded } from "express";

// need filepathtourl to get the dirname
// need dirane to turn into path??
import { fileURLToPath } from "url";
import { dirname } from "path";

// set up directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// app setup
const app = express();
const port = 3000;
app.use(express.static("public", {
  extensions: ["css", "js", "html"]
}));
app.use(urlencoded({ extended: true }));

// setup the homepage routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

app.get("/weather.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

// setup the citycode form input
app.post("/cityCode", (req, res) => {
  const { code }  = req.body;

  console.log(code);

  res.redirect("/weather.html");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});