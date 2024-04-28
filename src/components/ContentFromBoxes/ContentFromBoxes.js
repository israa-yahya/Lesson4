// ContentFromBoxes.js

import React, { useState, useEffect } from "react";
import Box from "./../Box/Box";
import Pagination from "../Pagination/Pagination";
import styles from "./contentFromBoxes.module.css";
import BlogsServices from "../../services/Blogs";
import Title from "./../Title/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "react-i18next"; // Import useTranslation hook
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";

const ContentFromBoxes = () => {
  const { t } = useTranslation(); // Initialize useTranslation hook

  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6); // Number of blogs per page
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalLiked, setTotalLiked] = useState(0);
  const [totalUnliked, setTotalUnliked] = useState(0);

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

  // Calculate index of first and last blog for current page
  const indexOfLastBlog = currentPage * itemsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const updateTotals = (blogs) => {
    const likedCount = blogs.reduce(
      (count, blog) => count + (blog.liked ? 1 : 0),
      0
    );
    setTotalLiked(likedCount);
    setTotalUnliked(blogs.length - likedCount);
  };

  if (loading) {
    return <div>{t("loading")}</div>; // Translate loading message
  }

  if (error) {
    return <div>{t("error")}: {error}</div>; // Translate error message
  }

  return (
    <>
      <Title content={t("currentlyBlogs")} /> {/* Translate title */}
      <div className={styles.content}>
        <div className={styles.totalLiked}>
          <FontAwesomeIcon icon={faThumbsUp} /> {t("totalLiked")}: {totalLiked} {/* Translate total liked message */}
        </div>
        <div className={styles.totalUnliked}>
          <FontAwesomeIcon icon={faThumbsDown} /> {t("totalUnliked")}: {totalUnliked} {/* Translate total unliked message */}
        </div>
      </div>
      <section className={styles.content}>
        {currentBlogs.map((blog) => (
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
      {/* Pagination */}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={blogs.length}
        currentPage={currentPage}
        paginate={paginate}
      />
    </>
  );
};

export default ContentFromBoxes;
