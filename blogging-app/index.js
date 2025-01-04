import client from './client.js';

async function main() {
  try {
    // get all posts
    const posts = await client.getPosts();
    console.log("all posts: ");
    console.log(posts.data);

    // get post with id=1
    const id = 1;
    const post = await client.getPostById(id);
    console.log("post with id ", id);
    console.log(post.data);

    // create new post
    const postObject = { title: "title5", content: "content5", category: "category5", tags: ["tag5", "tag6"] }
    const newPost = await client.createNewPost(postObject);
    console.dir(newPost.data);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();