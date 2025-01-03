import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
import { MongoClient, ServerApiVersion } from "mongodb";

dotenv.config();

const URI = process.env.MONGO_CONNECTION_STRING;

const router = Router();

router.get("/posts", async (req, res) => {
  console.log("we made it to GET /posts");

  // term is optional so we can stay here if
  const term = req.query.term;
  if (term) {
    console.log(`included search term: ${term}`)
  }

  const testObjects = [
    {
      id: 1,
      title: "title1",
      content: "content1",
      category: "category1",
      tags: ["tag1", "tag2"],
      createdAt: "2025-01-03T01:20:00Z",
      updatedAt: "2025-01-03T01:40:00Z"
    },
    {
      id: 2,
      title: "title1",
      content: "content1",
      category: "category1",
      tags: ["tag1", "tag2"],
      createdAt: "2025-01-03T02:20:00Z",
      updatedAt: "2025-01-03T02:40:00Z"
    }
  ]

  try {
    // we try to retrieve all the posts
    return res.status(200).json({ data: testObjects});
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

  const testObjects = {
    id: 1,
    title: "title1",
    content: "content1",
    category: "category1",
    tags: ["tag1", "tag2"],
    createdAt: "2025-01-03T01:20:00Z",
    updatedAt: "2025-01-03T01:40:00Z"
  }

  try {
    // we try to retieve the post from mongodb
    return res.status(200).json({ data: testObjects});
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
    const postObject = {
      id: "post id",
      title: title,
      content: content,
      category: category,
      tags: tags,
      createdAt: "creation date",
      updatedAt: "updateded date"
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
      updatedAt: "updateded date"
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