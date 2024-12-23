async function readPosts(filePath) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', filePath);
    xhr.onload = () => {
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } catch (error) {
          reject(new Error(`Error parsing JSON: ${error.message}`));
        }
      } else {
        reject(new Error(`HTTP error! status: ${xhr.status}`));
      }
    };
    xhr.onerror = () => {
      reject(new Error('Network request failed'));
    };
    xhr.send();
  });
}

async function addPosts() {
  try {
    const data = await readPosts('../posts.json');
    for (const post of data) {
      console.log(post);
    }
    
    const blogContainer = document.getElementById("blog-posts-container");

    for (const post of data) {
      const blogPostElement = document.createElement("div");
      blogPostElement.id = post.id;
      blogPostElement.className = "blog-post-element";

      const blogPostLinkContainer = document.createElement("div");
      blogPostLinkContainer.className = "blog-post-link-container";

      const blogPostLink = document.createElement("a");
      blogPostLink.href = `./post.html/${post.id}`;
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

addPosts();