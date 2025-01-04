import client from './client.js';

async function main() {
  try {
    // get all posts
    // const posts = await client.getPosts();
    // console.log("all posts: ");
    // console.log(posts.data);

    // get post with id=1
    // const getId = 1;
    // const post = await client.getPostById(getId);
    // console.log("post with id ", getId);
    // console.log(post.data);

    // create new post
    // const newPostObject = { title: "title5", content: "content5", category: "category5", tags: ["tag5", "tag6"] }
    // const newPost = await client.createNewPost(newPostObject);
    // console.dir(newPost.data);

    //update post
    const updateId = 2;
    const updatePostObject = { id: updateId, title: "title2 - updated", content: "content2 and more", category: "category2", tags: ["tag23", "tag34"] }
    const updatedPost = await client.updatePost(updatePostObject);
    console.log(updatedPost.data)

    // delete post

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

main();