// BlogDetails.js
import React, { useState, useEffect } from "react";
import BlogsServices from "../../services/Blogs";
import { useParams } from "react-router-dom";
import styles from "./Blog.module.css";
const BlogDetails = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const fetchedBlog = await BlogsServices.fetchDataById(id);
        setBlog(fetchedBlog);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>{blog.title}</h2>
        <p>{blog.description}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
