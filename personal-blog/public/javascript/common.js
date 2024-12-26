export async function readPosts() {
  const response = await fetch("/api/posts");
  if (!response.ok) {
    throw new Error("network response was not ok");
  }

  return (await response.json());
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