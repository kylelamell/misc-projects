import { readPosts } from "./common.js";

async function getPosts() {
  // get the posts and make their containers
  try {
    const posts = await readPosts();
    
    const blogContainer = document.getElementById("blog-posts-container");

    for (const post of posts) {
      const blogPostElement = document.createElement("div");
      blogPostElement.id = post.id;
      blogPostElement.className = "blog-post-element";

      const blogPostLinkContainer = document.createElement("div");
      blogPostLinkContainer.className = "blog-post-link-container";

      // create the link based on the post id, encode the id into the url
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