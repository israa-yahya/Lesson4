// hooks/useEditForm.js
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import BlogsServices from "./../services/Blogs";

const useEditForm = ( blog ) => {
  const { i18n } = useTranslation();

  const validationSchema =
    i18n.language === "en"
      ? require("../components/EditBlog/schema").validationSchemaEn
      : require("../components/EditBlog/schema").validationSchemaAr;

  const handleSubmit = async (values, formikBag) => {
    try {
      const editBlog = i18n.language === "en"
        ? BlogsServices.editBlogEn
        : BlogsServices.editBlogAr;

      await editBlog(blog.id, values);
      formikBag.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formikProps = useFormik({
    initialValues: {
      title: blog?.title || "",
      description: blog?.description || "",
    },
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });

  return {
    formikProps,
  };
};

export default useEditForm;
