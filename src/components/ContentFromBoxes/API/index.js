// API/index.js
export const fetchData = async (setTotalLiked, setTotalUnliked, setBlogs) => {
    try {
      const response = await fetch("db.json"); // Adjust the path as needed
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      if (data && data.blogs) {
        const initialLikedCount = data.blogs.filter((blog) => blog.liked).length;
        setTotalLiked(initialLikedCount);
        setTotalUnliked(data.blogs.length - initialLikedCount);
        setBlogs(data.blogs);
      } else {
        throw new Error("Invalid JSON data format");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error; // Rethrow the error to be caught by the caller
    }
  };
  