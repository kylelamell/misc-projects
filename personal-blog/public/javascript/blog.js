import { readPosts } from "./common.js";

async function getPosts() {
  try {
    const posts = await readPosts('../posts.json');
    for (const post of posts) {
      console.log(post);
    }
    
    const blogContainer = document.getElementById("blog-posts-container");

    for (const post of posts) {
      const blogPostElement = document.createElement("div");
      blogPostElement.id = post.id;
      blogPostElement.className = "blog-post-element";

      const blogPostLinkContainer = document.createElement("div");
      blogPostLinkContainer.className = "blog-post-link-container";

      const blogPostLink = document.createElement("a");
      blogPostLink.href = `./post.html?post=${post.id}`;
      blogPostLink.textContent = `${post.name}`;
      blogPostLinkContainer.appendChild(blogPostLink);

      const blogPostDate = document.createElement("p");
      blogPostDate.textContent = post.date;

      blogPostElement.appendChild(blogPostLinkContainer);
      blogPostElement.appendChild(blogPostDate);

      blogContainer.appendChild(blogPostElement);

    }    
  } catch (error) {
    console.error(error);
  }
}

getPosts();