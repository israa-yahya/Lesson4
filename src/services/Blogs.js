import axios from "axios";

class BlogsServices {
  static async fetchData() {
    try {
      const response = await axios.get("http://localhost:3000/blogs");
      return response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }

  static async handleSubmit(formData) {
    try {
      await axios.post("http://localhost:3000/blogs", formData);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async deleteBlog(id) {
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  static async handleLike(id) {
    const url = `http://localhost:3000/blogs/${id}`;
    try {
      const response = await axios.patch(url, {
        liked: 1,
        unliked: 0,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update card.");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  }

  static async handleUnLike(id) {
    const url = `http://localhost:3000/blogs/${id}`;
    try {
      const response = await axios.patch(url, {
        liked: 0,
        unliked: 1,
      });

      if (response.status !== 200) {
        throw new Error("Failed to update card.");
      }
    } catch (error) {
      console.error("Error updating card:", error);
    }
  }
}

export default BlogsServices;
