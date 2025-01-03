import { createClient } from "redis";
import dotenv from "dotenv";

dotenv.config();

let redisClient;

async function createRedisClient() {
  redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }
  })

  redisClient.on("error",(err) => console.error(`error connecting to redis client: ${err}`));
  redisClient.on("connect", () => console.info("connected redis client"));
  await redisClient.connect();
}

await createRedisClient();

export { redisClient }