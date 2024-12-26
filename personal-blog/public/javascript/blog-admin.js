import { readPosts, writePosts } from "./common.js";


async function displayEditPosts(){
  try {
    const posts = await readPosts("../posts.json");

    const editPostsContainer = document.getElementById("edit-post-container");

    for (const post of posts) {
      const postContainer = document.createElement("div");

      const editForm = document.createElement("form");

      editForm.id = post.id;
      editForm.className = "post-edit-form";
      editForm.method = "post";
      
      const editButton = document.createElement("input");
      editButton.type = "submit";
      editButton.value = "Edit";
      editButton.formAction = "/editPost";

      const deleteButton = document.createElement("input");
      deleteButton.type = "submit";
      deleteButton.value = "Delete";
      deleteButton.formAction = "/deletePost";

      editForm.appendChild(editButton);
      editForm.appendChild(deleteButton);

      postContainer.appendChild(editForm);

      editPostsContainer.appendChild(postContainer);
    }
    

  }
  catch (err) {
    console.log(err);
  }
  
}

displayEditPosts();