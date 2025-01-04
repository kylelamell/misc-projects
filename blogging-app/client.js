import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const client = {
  async getPosts() {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      return response.data;
    } 
    catch (error) {
      console.error("Error fetching posts:", error);
      throw error;
    }
  },

  async getPostById(postId) {
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}`);
      return response.data;
    } 
    catch (error) {
      console.error("Error fetching post:", error);
      throw error;
    }
  },

  async createNewPost(postObject) {
    try {
      const response = await axios.post(`${apiUrl}/posts`, {
        title: postObject.title,
        content: postObject.content,
        category: postObject.category,
        tags: postObject.tags
      });
      return response.data;
    } catch (error) {
      console.error("error creating post:", error);
      throw error;
    }
  },

  async updatePost(postObject) {
    try {
      const response = await axios.put(`${apiUrl}/posts/${postObject.id}`, {
        title: postObject.title,
        content: postObject.content,
        category: postObject.category,
        tags: postObject.tags
      });
      return response.data;
    }
    catch (error) {
      console.error("error updating post:", error);
      throw error;
    }
  },

  async deletePost(postId) {
    try {
      const response = await axios.delete(`${apiUrl}/posts/${postId}`);

      return response.data;
    }
    catch (error) {
      console.log("error deleting post:", error);
      throw error;
    }
  }
};

export default client;