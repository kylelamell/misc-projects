import express, { urlencoded } from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

// setup directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ------------ app  setup -------------
const app = express();
const port = process.env.PORT;
const api_port = process.env.API_PORT;
app.use(express.static("public", {
  extensions: ["css", "js", "html"]
}));
app.use(urlencoded({ extended: true }));
app.use(express.json());
// -------------------------------------

// setup the homepage routes
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

app.get("/weather.html", (req, res) => {
  res.sendFile(__dirname + "/public/html/weather.html")
});

// setup the weather api fetch
app.post("/weather", async (req, res) => {
  const city = req.body.city;

  try {
    const response = await axios.get(`http://localhost:${api_port}/?city=${city}`);
    const data = response.data;

    res.json(data);
  }
  catch (error) {
    console.error("error fetching the weather data", error);
    res.status(500).json({ error: "error fetching weather data" });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});