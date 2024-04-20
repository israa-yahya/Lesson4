import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Form.module.css"; // Import CSS module
import { validationSchema } from "./schema";
import useForm from "../hooks/useForm";
import BlogsServices from "./../../services/Blogs";

const AddBlogForm = () => {
  const initialValues = {
    title: "",
    description: "",
    liked: 0,
    unliked: 0,
  };
  const onSubmitCallBack = async (values, { setSubmitting, resetForm }) => {
    await BlogsServices.handleSubmit(values);
    // Logic to submit form data
    console.log("Submitted values:", values);
    // Reset form after successful submission
    resetForm();
    setSubmitting(false); // Uncomment if you want to manually control submitting
  };

  const { errors, touched } = useForm(initialValues, onSubmitCallBack);

  return (
    <div id="newsForm" className={styles.form}>
      <h2>Add Blog:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitCallBack}
      >
        {() => (
          <Form>
            <div>
              <label htmlFor="title">
                Title (maximum 50 characters, letters only):
              </label>
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
              <label htmlFor="description">
                Description (maximum 500 characters):
              </label>
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
            <button type="submit" className={styles.myButton}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlogForm;
