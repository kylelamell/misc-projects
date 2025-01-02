import express, { urlencoded, rateLimit } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";

// get the api key and set it up
import "./config.js";
const apiKey = process.env.TIMELINE_WEATHER_API_KEY;

// setup directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// setup the rate limiter
const limiter = rateLimit({
  window: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false
});

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
  const { code }  = req.body;

  if (!code) {
    return res.status(400).json({ error: "missing city code in request body" });
  }

  // the code is not used yet
  if (code === "1500") {
    return res.json({ data: "good news, the city data is already cached" })
  }

  // try to fetch some example data
  try {
    const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?key=${apiKey}`;
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