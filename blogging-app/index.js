import client from './client';

async function main() {
  try {
    // Get all posts
    const posts = await client.getPosts();
    console.log('All Posts:', posts);

    // Get a single post by ID
    const postId = 'your_post_id'; // Replace with the actual ID
    const post = await client.getPostById(postId);
    console.log('Single Post:', post);

    // ... Add more API calls here ...

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();