import client from './client.js';

async function main() {
  try {
    // Get all posts
    const posts = await client.getPosts();
    console.log(posts.data);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();