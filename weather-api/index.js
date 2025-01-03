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

  // setup redis
  const client = createClient();
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();

  const cacheValue = await client.hGetAll(city);

  console.log(Object.values(cacheValue).length);

  // the object is not cached
  if (Object.values(cacheValue).length === 0) {
    console.log("cache is empty, we will fetch for the city information");
    try {
      const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${apiKey}`;
      const APIres = await axios.get(URL);

      const currData = APIres.data.currentConditions;
      console.log("current data", currData);

      try {
        await client.hSet(city, JSON.stringify(currData));
      } 
      catch (error) {
        console.log("error in response 1", error)
      }
      
      try {
        const res2 = await client.hGetAll(city);
        console.log("response 2: ", res2);
      }
      catch (error) {
        console.log("error in response 2", error)
      }

      console.log("type of city: ",  typeof(city));
      console.log("type of currData: ",  typeof(currData));
      

      // client.hGet(city, (err, reply) => {
      //   if (err) {
      //     console.error("error retrieving from redis");
      //   }
      //   else {
      //     console.log("data retrieved from redis: ", reply);
      //   }
      // });

      return res.json(APIres.data);

      // client.hSet(city, JSON.stringify(APIres.data), "EX", 60, (err, reply) => {
      //   if (err) {
      //     console.error("error setting object in redis", err);
      //   }
      //   else {
      //     console.log("stored in redis");
      //   }
      // });

      // client.hGet(city, (err, reply) => {
      //   if (err) {
      //     console.error("errer getting object from redis", err);
      //   }
      //   if (reply) {
      //     const cityData = JSON.parse(reply);
      //     return res.json(cityData);
      //   }
      //   else {
      //     console.log("City data not found or key expired");
      //   }
      // });
    }
    catch (err) {
      console.error(err.message);
      return res.status(500).json({ error: "failed to retrieve weather data" });
    }
  }
  // the object is cached
  else {
    // client.hGet(city, (err, reply) => {
    //   if (err) {
    //     console.error("error getting object from redis", err);
    //   }
    //   if (reply) {
    //     const cityData = JSON.parse(reply);
    //     return res.json(cityData);
    //   }
    //   else {
    //     console.log("City data not found or key expired");
    //   }
    // });
  }

  await client.disconnect();
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});