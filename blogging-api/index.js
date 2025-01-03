import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";

dotenv.config();

// setup rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "error: too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

// app setup
const port = process.env.PORT;
const app = express();

// use the rate limiter first
app.use(limiter);

// mount the routes from our rout file
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});