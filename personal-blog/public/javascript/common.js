export async function readPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }

  return (await response.json());
};

export function writePosts(posts) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "../blog-admin.php", true);
  xhr.setRequestHeader("Content-Type", "application/json");

  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // Handle the response from the PHP script (if any)
      const response = JSON.parse(xhr.responseText); 
      console.log(response); 
      // Do something with the response, e.g., display a message to the user
    } else if (xhr.readyState === 4 && xhr.status !== 200) {
      console.error("Error calling PHP script:", xhr.status, xhr.statusText);
      // Handle the error, e.g., display an error message to the user
    }
  };

  xhr.send(JSON.stringify(posts));
};

export function getNextId(posts) {
  let currId = 0;
  for (const post of posts) {
    if (post.id == currId) {
      ++currId;
    }
    else {
      break;
    }
  }
  return currId;
};

export function refactorPostId(posts, id) {
  for (const post of posts) {
    if (post.id > id) {
      --post.id;
    }
  }
  return posts;
}