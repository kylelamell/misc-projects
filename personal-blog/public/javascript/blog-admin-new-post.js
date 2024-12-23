import { readPosts, writePosts, getNextId } from "./common.js";

// get the login form from the html page
const form = document.getElementById("new-post-form");

//create an event lsitener for the submit button
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // gather form data into an object
  const formData = new FormData(form);

  // create a custom event to add the form data object as the events detail property
  const addData = new CustomEvent("formSubmitted", { 
    detail: { formData } 
  });

  // dispatch the custom event on the document object
  document.dispatchEvent(addData);
});

// In your JavaScript module
document.addEventListener("formSubmitted", async (event) => {
  const name = event.detail.formData.get("name");
  const content = event.detail.formData.get("content")

  console.log("post name: ", name);
  console.log("post content: ", content);

  try {
    const posts = await readPosts("../posts.json");

    const d = new Date();

    const newPost = {
      "id": getNextId(posts),
      "date": d.toLocaleDateString(),
      "name": name,
      "content": content
    }

    posts.push(newPost);

    for(const post of posts) {
      console.log(post);
    }
    writePosts(posts, "../posts.json");
  }
  catch (error) {
    console.log(error);
  }
  
});