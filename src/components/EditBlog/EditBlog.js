import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BlogsServices from "../../services/Blogs";
import styles from "./EditBlogPage.module.css"; // Import the CSS module
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the check icon
import Title from "./../Title/Title";

const EditBlogPage = () => {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await BlogsServices.fetchDataById(id);
        setTitle(blog.title);
        setDescription(blog.description);
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };

    fetchBlog();
  }, [id]);

  const handleEditBlog = async () => {
    try {
      await BlogsServices.editBlog(id, { title, description });
      //   history.push("/blogs"); // Redirect to the blogs page after editing
    } catch (error) {
      console.error("Error editing blog:", error);
    }
  };

  return (
    <div >
      {" "}
      {/* Apply container class */}
      <Title content={"Edit Blogs:"} />
      <form className={styles.Form} onSubmit={handleEditBlog}>
        <div className={styles.formGroup}>
          {" "}
          {/* Apply form-group class */}
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.formGroup}>
          {" "}
          {/* Apply form-group class */}
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button type="submit">
          <FontAwesomeIcon icon={faCheck} className={styles.faCheck} />
          {""}
          Save
        </button>
      </form>
    </div>
  );
};

export default EditBlogPage;
