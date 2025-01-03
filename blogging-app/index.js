import client from './client.js';

async function main() {
  try {
    // Get all posts
    const posts = await client.getPosts();
    console.log('All Posts:', posts);

    // Get a single post by ID
    const postId = '1'; // Replace with the actual ID
    const post = await client.getPostById(postId);
    console.log('Single Post:', post);

    // ... Add more API calls here ...

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();