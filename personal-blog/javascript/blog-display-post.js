import { readPosts } from "./posts.js";

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("post");

async function displayPost(postId) {
  try {
    // get all the posts
    const posts = await readPosts("../posts.json");

    // filter to the specified post and extract that object
    // which will always be at index 0
    const post = posts.filter((post) => post.id == postId).at(0);
    console.log(post);

    const name = document.getElementById("post-name");
    const content = document.getElementById("post-content");
    const date = document.getElementById("post-date")

    name.innerHTML = post.name;
    date.innerHTML = post.date;
    content.innerHTML = post.content;
  }
  catch (error) {
    console.log(error);
  }
}

displayPost(postId);