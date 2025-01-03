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
  const postId = req.params.postId;
  if (!postId) {
    return res.redirect("/posts");
  }

  try {
    // we try to retieve the post from mongodb
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
  }
  finally {
    await closeConnection();
  }
});

router.post("/posts", async (req, res) => {
  console.log("we made it to POST /posts");

  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;
  const tags = req.body.tags;

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in request body" });
  }

  try {
    // try to create the post
    return res.status(201).json({ data: postObject })
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "there was an error in creating the post"});
  }
});

router.put("/posts/:postId", async (req, res) => {
  console.log("we made it to PUT /posts/postId");

  const postId = req.params.postId;

  const title = req.body.title;
  const content = req.body.content;
  const category = req.body.category;
  const tags = req.body.tags;

  if (!postId) {
    return res.status(400).json({ error: "no post specified in PUT request"});
  }

  if (!title || !content || !category || !tags) {
    return res.status(400).json({ error: "not enough arguments in request body" });
  }

  try {
    // try to update the post
    const postObject = {
      id: "post id",
      title: title,
      content: content,
      category: category,
      tags: tags,
      createdAt: "creation date",
      updatedAt: new Date().toLocaleDateString()
    }
    return res.status(200).json({ data: postObject });
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
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