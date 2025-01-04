import express, { json, urlencoded } from "express";
import rateLimit from "express-rate-limit";
import { config } from "dotenv";
import { router } from "./routes/routes.js";

// setup enviornment variables
config();
const port = process.env.PORT

// setup rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "error: too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

// app setup
const app = express();
app.use(limiter);
app.use(json());
app.use(urlencoded({ extended: true }));

// mount the routes from our route file
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
