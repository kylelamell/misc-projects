import { readPosts } from "./common.js";

async function displayEditPosts(){
  // get the posts and make the containers for editing them
  try {
    const posts = await readPosts();

    const editPostsContainer = document.getElementById("edit-post-container");

    for (const post of posts) {
      const postContainer = document.createElement("div");
      postContainer.className = "post-container";

      const postNameContainer = document.createElement("div");
      postNameContainer.className = "post-name-container";

      const postName = document.createElement("p");
      postName.innerHTML = post.name;

      const editForm = document.createElement("form");
      editForm.id = post.id;
      editForm.className = "post-edit-form";
      editForm.method = "post";
      
      const editButton = document.createElement("input");
      editButton.type = "submit";
      editButton.value = "Edit";
      editButton.formAction = "/editPost";

      const editValue = document.createElement("input");
      editValue.type = "text";
      editValue.id = "id";
      editValue.name = "id";
      editValue.value = post.id;
      editValue.className = "edit-post-value";

      const deleteButton = document.createElement("input");
      deleteButton.type = "submit";
      deleteButton.value = "Delete";
      deleteButton.formAction = "/deletePost";

      postNameContainer.appendChild(postName);

      editForm.appendChild(editValue);
      editForm.appendChild(editButton);
      editForm.appendChild(deleteButton);

      const formContainer = document.createElement("div");
      formContainer.className = "form-container";

      formContainer.appendChild(editForm);

      postContainer.appendChild(postNameContainer);
      postContainer.appendChild(formContainer);

      editPostsContainer.appendChild(postContainer);
    }
  }
  catch (err) {
    console.log(err);
  }
}

displayEditPosts();