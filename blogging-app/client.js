import axios from 'axios';

const apiUrl = 'http://localhost:3000';

const client = {
  async getPosts() {
    try {
      const response = await axios.get(`${apiUrl}/posts`);
      return response.data;
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  async getPostById(postId) {
    try {
      const response = await axios.get(`${apiUrl}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching post:', error);
      throw error;
    }
  },

  // Add methods for other API endpoints (POST, PUT, DELETE)
};

export default client;