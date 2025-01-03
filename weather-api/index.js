import express from "express";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import rateLimit from "express-rate-limit";

dotenv.config();

// setup the rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "error: too many requests",
  standardHeaders: true,
  legacyHeaders: false
});

const app = express();
const port = 3000;

app.use(limiter);
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});