import React, { useState, useEffect } from "react";
import BlogsServices from "../../services/Blogs";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./Blog.module.css";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const fetchedBlog =
        i18n.language === "en"
          ? await BlogsServices.fetchDataByIdEn(id)
          : await BlogsServices.fetchDataByIdAr(id);
      setBlog(fetchedBlog);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await (i18n.language === "en"
        ? BlogsServices.deleteBlogEn(id)
        : BlogsServices.deleteBlogAr(id));
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = () => {
    navigate(`/editBlog/${id}`);
  };

  const handleLike = async (id) => {
    try {
      if (i18n.language === "en") {
        await BlogsServices.handleLikeEn(id);
      } else {
        await BlogsServices.handleLikeAr(id);
      }
      fetchData(); // Fetch updated data after like
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUnLike = async (id) => {
    try {
      if (i18n.language === "en") {
        await BlogsServices.handleUnLikeEn(id);
      } else {
        await BlogsServices.handleUnLikeAr(id);
      }
      fetchData(); // Fetch updated data after unlike
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id, i18n.language]);

  if (loading) {
    return <div>{t("loading")}</div>;
  }

  if (error) {
    return (
      <div>
        {t("error")}: {error}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.row}>
          <h2 className={styles.title}>{t(blog.title)}</h2>
          <button className={styles.editButton} onClick={handleEdit}>
            <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
          </button>
        </div>
        <p className={styles.description}>{t(blog.description)}</p>
        <div className={styles.btn}>
          <div className={styles.likeButtons}>
            {blog.liked ? (
              <button
                className={styles.unlikeButton}
                onClick={() => handleUnLike(blog.id)}
              >
                <FontAwesomeIcon icon={faThumbsDown} />
              </button>
            ) : (
              <button
                className={styles.likeButton}
                onClick={() => handleLike(blog.id)}
              >
                <FontAwesomeIcon icon={faThumbsUp} />
              </button>
            )}
          </div>
          <button className={styles.deleteButton} onClick={handleDelete}>
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
