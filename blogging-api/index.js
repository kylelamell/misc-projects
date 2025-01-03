import express from "express";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { router } from "./routes/routes.js";
import { connect, closeConnection } from "./config/mongoConfig.js";

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

// mount the routes from our route file
app.use("/", router);

async function run() {
  try {
    await connect();
    console.log("connected to mongo");

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  }
  catch (error) {
    console.error("error connecting to mongo: ", error);
    process.exit(1);
  }
}

run();

process.on("SIGINT", async () => {
  console.log("shuting down, closing mongo connection");
  await closeConnection();
  console.log("mongo connection closed");
  process.exit(0);
})