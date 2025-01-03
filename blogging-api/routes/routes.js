import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const database = process.env.MONGO_DATABASE;
const postCollection = process.env.MONOG_POST_COLLECTION;

const router = Router();
router.get("/posts", async (req, res) => {
  console.log("we made it to GET /posts");

  // term is optional so we can stay here if
  const term = req.query.term;
  if (term) {
    console.log(`included search term: ${term}`)
  }

  try {
    // we try to retrieve all the posts
    const db = client.db(database);
    const posts = client.collection(postCollection);

    let result;
    if (term) {
      const agg = [{$search: {wildcard: {query: `*${term}*`}}}]
    }
    else {
      result = await postCollection.find({}).toArray();
    }

    return res.status(200).json({ data: result});
  }
  catch (error) {
    console.log(error);
    return res.status(400).json({ error: "there was an errro retriving all posts" });
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
    const db = mongoClient.db(database);
    const posts = mongoClient.collection(postCollection);

    const query = { id: postId };

    const result = await postCollection.findOne(query);

    return res.status(200).json({ data: result});
  }
  catch (error) {
    console.log(error);
    return res.status(404).json({ error: "post not found" });
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
    const lastEntry = await collection.findOne({}, { sort: { id: -1 } }); 
    const postObject = {
      id: lastEntry + 1,
      title: title,
      content: content,
      category: category,
      tags: tags,
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString()
    }

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