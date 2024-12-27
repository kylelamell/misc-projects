import { readPosts } from "./common.js";

// get the encoded id from the url
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");

async function displayPost(postId) {
  try {
    // get all the posts
    const posts = await readPosts();

    // filter to the specified post and extract that object
    // which will always be at index 0
    const post = posts.filter((post) => post.id == postId).at(0);

    const editContainer = document.getElementById("edit-form-container");

    const editForm = document.createElement("form");
    editForm.id = "edit-form";
    editForm.className = "edit-form";
    editForm.method = "post";

    const editNameDiv = document.createElement("div");
    editNameDiv.id = "name-edit";
    editNameDiv.className = "edit-form-element";
    
    const nameInput = document.createElement("input");
    nameInput.id = "name-input";
    nameInput.className = "edit-form-input";
    nameInput.name = "name";
    nameInput.value = post.name;

    editNameDiv.appendChild(nameInput);

    const editContentDiv = document.createElement("div");
    editContentDiv.id = "content-edit";
    editContentDiv.className = "edit-form-element";


    const contentInput = document.createElement("textarea");
    contentInput.id = "content-input";
    contentInput.className = "edit-form-input";
    contentInput.name = "content";
    contentInput.value = post.content;

    editContentDiv.appendChild(contentInput);

    const editButton = document.createElement("input");
    editButton.type = "submit";
    editButton.value = "Edit";
    editButton.formAction = "/editPostComplete";
    editButton.className = "form-button";

    const postIdInput = document.createElement("input");
    postIdInput.id = "id-input";
    postIdInput.className = "edit-form-input-hidden";
    postIdInput.name = "id";
    postIdInput.value = post.id;
    
    editForm.appendChild(postIdInput);
    editForm.appendChild(editNameDiv);
    editForm.appendChild(editContentDiv);
    editForm.appendChild(editButton);

    editContainer.appendChild(editForm);

  }
  catch (error) {
    console.log(error);
  }
}

displayPost(postId);