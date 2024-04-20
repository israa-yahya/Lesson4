// Box.js

import React from "react";
import styles from "./Box.module.css"; // Import CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons"; // Import the thumbs-up and thumbs-down icons
import { faTrash } from "@fortawesome/free-solid-svg-icons"; // Import the trash icon
import BlogsServices from './../../services/Blogs';

const Box = ({ id, title, description, liked, onLike, onUnlike }) => {
  const handleDelete = () => {
    BlogsServices.deleteBlog(id); // Call deleteBlog function with post id
  }; return (
    <div className={styles.blog_item}>
      {/* <img src={imageUrl} alt={title} className={styles.image} /> */}
      
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
      <div className={styles.btn}>
      <div className={styles.likeButtons}>
        {liked ? (
          <button className={styles.unlikeButton} onClick={onUnlike}>
            <FontAwesomeIcon icon={faThumbsDown} />{" "}
          </button>
        ) : (
          <button className={styles.likeButton} onClick={onLike} >
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>
        )}
      </div>
      <button className={styles.deleteButton} onClick={handleDelete}>
        <FontAwesomeIcon icon={faTrash} className={styles.trashIcon} />
      </button> {/* Button to delete the post */}</div>
    </div>
  );
};

export default Box;
