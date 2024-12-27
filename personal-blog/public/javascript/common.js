// read posts api can be called from scripts
export async function readPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }

  return (await response.json());
};

// gets the next available id
// usually for making new posts
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

// refactors the post ids
// usually after deleting a post to make sure they are in ascending order
export function refactorPostId(posts, id) {
  for (const post of posts) {
    if (post.id > id) {
      --post.id;
    }
  }
  return posts;
};