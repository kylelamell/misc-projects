import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import { createClient } from "redis";
import { rateLimit } from "express-rate-limit";

// get the api key and set it up
import "./config.js";
const apiKey = process.env.TIMELINE_WEATHER_API_KEY;

// setup directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// setup the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "error: too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

// setup redis
const client = createClient();

function checkCache(req, res, next) {
  const key = req.path;
}

// ------------ app  setup -------------
const app = express();
const port = 3000;
app.use(express.static("public", {
  extensions: ["css", "js", "html"]
}));
app.use(urlencoded({ extended: true }));
app.use(express.json());
app.use(limiter);
// -------------------------------------

// setup the homepage routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

app.get("/weather.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

// setup the weather api fetch
app.post("/api/weatherAPI", async (req, res) => {
  const { city }  = req.body;

  if (!city) {
    return res.status(400).json({ error: "missing city code in request body" });
  }

  // add some logic for the memory caching here
  
  // ------------------------------------------

  // try to fetch some example data
  try {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
    const APIres = await axios.get(URL);
    return res.json(APIres.data);
  }
  catch (err) {
    console.error(err.message);
    return res.status(500).json({ error: "failed to retrieve weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});