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
app.use(express.json());

// setup the homepage routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

app.get("/weather.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

// setup the weather api fetch
app.post("/api/weatherAPI", (req, res) => {
  const { code }  = req.body;

  if (!code) {
    return res.status(400).json({ error: "missing city code in request body" });
  }

  console.log(code);
  
  res.json({ data: "we made it to the backend and back again!" });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});