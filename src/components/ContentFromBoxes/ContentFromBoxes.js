// ContentFromBoxes.js
import React, { useState, useEffect } from "react";
import Box from "./../Box/Box";
import styles from "./contentFromBoxes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import BlogsServices from "../../services/Blogs";

const ContentFromBoxes = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalLiked, setTotalLiked] = useState(0);
  const [totalUnliked, setTotalUnliked] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const fetchedBlogs = await BlogsServices.fetchData();
        setBlogs(fetchedBlogs);
        updateTotals(fetchedBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []);

  const updateTotals = (blogs) => {
    const likedCount = blogs.reduce((count, blog) => count + (blog.liked ? 1 : 0), 0);
    setTotalLiked(likedCount);
    setTotalUnliked(blogs.length - likedCount);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className={styles.content}>
        <div className={styles.totalLiked}>
          <FontAwesomeIcon icon={faThumbsUp} /> Total Liked: {totalLiked}
        </div>
        <div className={styles.totalUnliked}>
          <FontAwesomeIcon icon={faThumbsDown} /> Total Unliked: {totalUnliked}
        </div>
      </div>
      <section className={styles.content}>
        {blogs.map((blog) => (
          <Box
            key={blog.id}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            liked={blog.liked}
            onLike={() => BlogsServices.handleLike(blog.id)}
            onUnlike={() => BlogsServices.handleUnLike(blog.id)} 
          />
        ))}
      </section>
    </>
  );
};

export default ContentFromBoxes;
