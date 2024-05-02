// import React, { useState, useEffect } from "react";
// import { useParams,useNavigate } from "react-router-dom";
// import BlogsServices from "../../services/Blogs";
// import styles from "./EditBlogPage.module.css"; // Import the CSS module
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheck } from "@fortawesome/free-solid-svg-icons"; // Import the check icon
// import Title from "./../Title/Title";
// import { useTranslation } from "react-i18next";

// const EditBlogPage = () => {
//   const { id } = useParams();
//   const { t, i18n } = useTranslation(); // Initialize useTranslation hook
//   // const navigate = useNavigate(); // Use the useNavigate hook to navigate

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const blog =
//           i18n.language === "en"
//             ? await BlogsServices.fetchDataByIdEn(id) // Pass id parameter to fetchDataByIdEn or fetchDataByIdAr
//             : await BlogsServices.fetchDataByIdAr(id);
//         setTitle(blog.title);
//         setDescription(blog.description);
//       } catch (error) {
//         console.error("Error fetching blog:", error);
//       }
//     };

//     fetchBlog();
//   }, [id]);

//   const handleEditBlog = async () => {
//     try {
//       i18n.language === "en"
//         ? await BlogsServices.editBlogEn(id, { title, description })
//         : await BlogsServices.editBlogAr(id, { title, description });
//     } catch (error) {
//       console.error("Error editing blog:", error);
//     }
//   };

//   return (
//     <div>
//       {" "}
//       {/* Apply container class */}
//       <Title content={t("editBlogs")} />
//       <form className={styles.Form} onSubmit={handleEditBlog}>
//         <div className={styles.formGroup}>
//           {" "}
//           {/* Apply form-group class */}
//           <label>Title:</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>
//         <div className={styles.formGroup}>
//           {" "}
//           {/* Apply form-group class */}
//           <label>Description:</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>
//         <button type="submit">
//           <FontAwesomeIcon icon={faCheck} className={styles.faCheck} />
//           {""}
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default EditBlogPage;
// components/EditBlogPage/EditBlogPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BlogsServices from "../../services/Blogs";
import styles from "./EditBlogPage.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import Title from "./../Title/Title";
import { useTranslation } from "react-i18next";
import useEditBlog from "../../hooks/useEditBlog";
import { FormikProvider, Form, Field, ErrorMessage } from "formik";

const EditBlogPage = () => {
  const { id } = useParams();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const { formikProps } = useEditBlog(blog);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog =
          i18n.language === "en"
            ? await BlogsServices.fetchDataByIdEn(id)
            : await BlogsServices.fetchDataByIdAr(id);
            setBlog(fetchedBlog);
        formikProps.setValues({
          title: fetchedBlog.title,
          description: fetchedBlog.description,
        });
      } catch (error) {
        console.error("Error fetching blog:", error);
      }
    };
    fetchBlog();
  }, [id, i18n.language]);

  const handleSubmit = async () => {
    try {
      await formikProps.submitForm(); // Corrected
      navigate("/");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <Title content={t("editBlogs")} />

      <div id="newsForm" className={styles.form}>
        <FormikProvider value={formikProps}>
          <Form>
            <div>
              <label htmlFor="title">{t("title")}</label>
              <br />
              <Field
                type="text"
                id="title"
                name="title"
                className={styles.myInput}
                required
              />
              <ErrorMessage
                name="title"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <label htmlFor="description">{t("description")}</label>
              <br />
              <Field
                type="text"
                id="description"
                name="description"
                className={styles.myInput}
                required
              />
              <ErrorMessage
                name="description"
                component="div"
                className={styles.error}
              />
            </div>
            <br />
            <button
              type="submit"
              className={styles.myButton}
              disabled={
                !formikProps.isValid ||
                !formikProps.dirty ||
                formikProps.isSubmitting
              }
              onClick={handleSubmit}
            >
              {t("submit")}
            </button>
          </Form>
        </FormikProvider>
      </div>
    </>
  );
};

export default EditBlogPage;
