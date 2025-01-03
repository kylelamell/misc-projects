import { MongoClient } from "mongodb";

async function mongoConnect(URI) {
  let mongoClient;
  try {
    mongoClient = new MongoClient(URI);
    await mongoClient.connect()

    return mongoClient;
  }
  catch (error) {
    console.error("error connecting to mongo", error);
  }
}

export { mongoConnect }