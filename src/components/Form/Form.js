
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import styles from './Form.module.css'; // Import CSS module
import { validationSchema } from './schema';
import { initialValues } from './constants';
import { submitForm } from './API/index';


const AddBlogForm = () => {
  return (
    <div id="newsForm" className={styles.form}>
      <h2>Add Blog:</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitForm}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="title">Title (maximum 50 characters, letters only):</label><br />
              <Field
                type="text"
                id="title"
                name="title"
                className={styles.myInput}
                required
              />
              <ErrorMessage name="title" component="div" className={styles.error} />
            </div>
            <div>
              <label htmlFor="description">Description (maximum 500 characters):</label><br />
              <Field
                type="text"
                id="description"
                name="description"
                className={styles.myInput}
                required
              />
              <ErrorMessage name="description" component="div" className={styles.error} />
            </div>
            <br />
            <button type="submit" className={styles.myButton} disabled={isSubmitting}>
              {isSubmitting ? 'Posting...' : 'Post'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddBlogForm;
