import React from "react";
import styles from "./Box.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faThumbsDown,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faRocketchat } from "@fortawesome/free-brands-svg-icons";
import BlogsServices from "./../../services/Blogs";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Box = ({ id, title, description, liked, onLike, onUnlike }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleDelete = () => {
    BlogsServices.deleteBlog(id);
  };

  const handleEdit = () => {
    navigate(`/editBlog/${id}`);
  };

  const handleViewDetails = () => {
    navigate(`/blog/${id}`);
  };

  return (
    <div className={styles.blog_item}>
      <div className={styles.row}>
        <h2 className={styles.title}>{t(title)}</h2>
        <button className={styles.editButton} onClick={handleEdit}>
          <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
        </button>
      </div>
      {t(description).length > 100 ? (
        <>
          <p className={styles.description}>
            {t(description).substring(0, 100)}...
          </p>
          <button
            className={styles.viewDetailsButton}
            onClick={handleViewDetails}
          >
            <FontAwesomeIcon icon={faRocketchat} />
          </button>
        </>
      ) : (
        <p className={styles.description}>{t(description)}</p>
      )}
      <div className={styles.btn}>
        <div className={styles.likeButtons}>
          {liked ? (
            <button className={styles.unlikeButton} onClick={onUnlike}>
              <FontAwesomeIcon icon={faThumbsDown} />
            </button>
          ) : (
            <button className={styles.likeButton} onClick={onLike}>
              <FontAwesomeIcon icon={faThumbsUp} />
            </button>
          )}
        </div>
        <button className={styles.deleteButton} onClick={handleDelete}>
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
};

export default Box;
