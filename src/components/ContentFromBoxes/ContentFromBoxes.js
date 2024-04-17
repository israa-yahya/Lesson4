import React, { useState, useEffect } from "react";
import Box from "./../Box/Box";
import styles from "./contentFromBoxes.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { fetchData } from './API/index'; // Correct import path

const ContentFromBoxes = () => {
  const [blogs, setBlogs] = useState([]);
  const [totalLiked, setTotalLiked] = useState(0);
  const [totalUnliked, setTotalUnliked] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        await fetchData(setTotalLiked, setTotalUnliked, setBlogs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAsync();
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  const handleLike = (index) => {
    const updatedBlogs = [...blogs];
    if (!updatedBlogs[index].liked) {
      updatedBlogs[index].liked = true;
      setTotalLiked(totalLiked + 1);
      setTotalUnliked(totalUnliked - 1);
      setBlogs(updatedBlogs);
    }
  };

  const handleUnlike = (index) => {
    const updatedBlogs = [...blogs];
    if (updatedBlogs[index].liked) {
      updatedBlogs[index].liked = false;
      setTotalLiked(totalLiked - 1);
      setTotalUnliked(totalUnliked + 1);
      setBlogs(updatedBlogs);
    }
  };

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
        {blogs.map((blog, index) => (
          <Box
            key={index}
            id={blog.id}
            title={blog.title}
            description={blog.description}
            liked={blog.liked}
            onLike={() => handleLike(index)}
            onUnlike={() => handleUnlike(index)}
          />
        ))}
      </section>
    </>
  );
};

export default ContentFromBoxes;
