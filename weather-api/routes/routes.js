import { Router } from "express";
import axios from "axios";
import { redisClient } from "../config/redisConfig.js";

const router = Router();

router.get("/", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).json({ error: "missing city in request body" });
  }

  try {
    const cachedValue = await redisClient.get(city);
    if (cachedValue) {
      return res.status(200).json({ "data": JSON.parse(cachedValue) });
    }
    else {
      const URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${process.env.TIMELINE_WEATHER_API_KEY}`;
      const APIres = await axios.get(URL);

      if (!APIres.data || !APIres.data.currentConditions) {
        return res.status(400).json({ error: "INvalid API response structure" });
      }

      const currData = APIres.data.currentConditions;

      await redisClient.set(city, JSON.stringify(currData), { "EX": 600, "NX": true} );

      return res.status(200).json({ data: currData });
    }
  }
  catch (err) {
    console.log(err);
    if (err.isAxiosError) {
      return res.status(500).json({ error: "error while fetching from the api: " + err.message });
    }
    else {
      return res.status(500).json({ error: "internal server error: " + err.message });
    }
  }
});

export { router }