import { Router } from "express";
import { config} from "dotenv";
import { mongoConnect } from "../config/mongoConfig.js";

// get our enviornment variables
config();
const blogDatabase = process.env.MONGO_POST_DATABASE;
const postCollection = process.env.MONGO_POST_COLLECTION;
const URI = process.env.MONGO_CONNECTION_STRING;

const router = Router();
router.get("/posts", async (req, res) => {
  // term is optional so we can stay here
  // implement in the future
  // const term = req.query.term;

  let mongoClient;
  try {
    // we try to retrieve all the posts
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);

    const result = await posts.find({}).toArray();

    return res.status(200).json({ data: result });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "there was an error retrieving all posts" });
  }
  finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
});

router.get("/posts/:postId", async (req, res) => {
  // get the post id and return if not present
  const postId = parseInt(req.params.postId);

  if (!postId) {
    return res.status(400).json({ error: "no post specified in GET request" });
  }

  let mongoClient;
  try {
    // we try to retieve the post from mongodb
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);

    const result = await posts.findOne({ id: postId });

    console.log(result);

    return res.status(200).json({ data: result });
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
  }
  finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
});

router.post("/posts", async (req, res) => {
  // get the post fields and return if we dont have enough
  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in POST request body" });
  }

  let mongoClient;
  try {
    // try to create the post
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);

    // get the largest id
    const res1 = await posts.findOne({}, { sort: { id: -1 } });

    // create the new post
    const date = new Date().toLocaleDateString();
    const postObject = {
      id: parseInt(res1.id) + 1,
      title: title,
      content: content,
      category: category,
      tags: tags,
      createdAt: date,
      updatedAt: date
    }

    const res2 = await posts.insertOne(postObject);

    return res.status(201).json({ data: postObject });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "there was an error in creating the post"});
  }
  finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
});

router.put("/posts/:postId", async (req, res) => {
  // get the post fields and return if we dont have enough
  const postId = parseInt(req.params.postId);
  const { title, content, category, tags } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "no post specified in PUT request"});
  }

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in PUT request body" });
  }

  let mongoClient;
  try {
    // try to update the post
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);    

    // set up the update request
    const filter = { id: postId };
    const options = { upset: true };
    const date = new Date().toLocaleDateString();
    const updateDoc = {
      $set: {
        title: title,
        content: content,
        category: category,
        tags: tags,
        updatedAt: date
      }
    }

    const res1 = await posts.updateOne(filter, updateDoc, options);

    const res2 = await posts.findOne({ id: postId });

    console.log(res2);

    return res.status(200).json({ data: res2 });
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
  }
  finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
});

router.delete("/posts/:postId", async (req, res) => {
  // get the post id and return if not present
  const postId = parseInt(req.params.postId);
  
  if (!postId) {
    return res.status(400).json({ error: "no post specified in DELETE request" });
  }

  let mongoClient;
  try {
    // try to delete the post
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);  

    const result = await posts.deleteOne({ id: postId });

    return res.status(204).json({ data: "post deleted"});
  }
  catch (error) {
    console.log(error);
    return res.status(404).json ({ error: "post not found" });
  }
  finally {
    if (mongoClient) {
      await mongoClient.close();
    }
  }
});

export { router }