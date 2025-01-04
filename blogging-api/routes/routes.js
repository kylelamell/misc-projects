import { Router } from "express";
import axios from "axios";
import { config} from "dotenv";
import { mongoConnect } from "../config/mongoConfig.js";

config();
const blogDatabase = process.env.MONGO_POST_DATABASE;
const postCollection = process.env.MONGO_POST_COLLECTION;
const URI = process.env.MONGO_CONNECTION_STRING;

const router = Router();
router.get("/posts", async (req, res) => {
  console.log("we made it to GET /posts");

  // term is optional so we can stay here
  const term = req.query.term;
  if (term) {
    console.log(`included search term: ${term}`)
  }
  let mongoClient;
  try {
    // we try to retrieve all the posts
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);

    const result = await posts.find({}).toArray();

    console.log(result);

    return res.status(200).json({ data: result });
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "there was an error retrieving all posts" });
  }
  finally {
    await mongoClient.close();
  }
});

router.get("/posts/:postId", async (req, res) => {
  console.log("we made it to GET /posts/:postId");

  // test to see if request gave a post id, if not then just display all posts
  const postId = parseInt(req.params.postId);

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
    await mongoClient.close();
  }
});

router.post("/posts", async (req, res) => {
  console.log("we made it to POST /posts");

  const { title, content, category, tags } = req.body;

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in request body" });
  }

  let mongoClient;
  try {
    // try to create the post
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);

    // get the largest id
    const res1 = await posts.findOne({}, { sort: { id: -1 } });

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
    await mongoClient.close();
  }
});

router.put("/posts/:postId", async (req, res) => {
  console.log("we made it to PUT /posts/:postId");

  const postId = parseInt(req.params.postId);
  const { title, content, category, tags } = req.body;

  if (!postId) {
    return res.status(400).json({ error: "no post specified in PUT request"});
  }

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in request body" });
  }

  let mongoClient;
  try {
    // try to update the post
    mongoClient = await mongoConnect(URI);

    const db = mongoClient.db(blogDatabase);
    const posts = db.collection(postCollection);    

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

    const result = await posts.updateOne(filter, updateDoc, options);

    console.log(result);

    return res.status(200).json({ data: result });
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
  }
  finally {
    await mongoClient.close();
  }
});

router.delete("/posts/:postId", async (req, res) => {
  const postId = req.params.postId;
  
  if (!postId) {
    return res.status(400).json({ error: "no post specified in DELETE request" });
  }

  try {
    // try to delete the post
    return res.status(204).json({ data: "post succwessfully deleted"});
  }
  catch (error) {
    console.log(error);
    return res.status(404).json ({ error: "post not found" })
  }
});

export { router }