import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_CONNECTION_STRING;

let mongoClient;

async function connect() {
  if (!mongoClient) {
    mongoClient = new MongoClient(URI);
    await mongoClient.connect();
  }
  return mongoClient;
}

async function closeConnection() {
  if (mongoClient) {
    await mongoClient.close();
    mongoClient = null;
  }
}

export { connect, closeConnection }