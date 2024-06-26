import { useFormik } from "formik";
import BlogsServices from "../services/Blogs";
import { useTranslation } from "react-i18next";

const useForm = () => {
  const { i18n } = useTranslation(); // Initialize useTranslation hook

  // Dynamically import validation schema based on language
  const validationSchema = i18n.language === "en"
    ? require("../components/Form/schema").validationSchemaEn
    : require("../components/Form/schema").validationSchemaAr;

  const initialValues = {
    title: "",
    description: "",
    liked: 0,
    unliked: 0,
  };

  const handleSubmit = async (values, formikBag) => {
    try {
      i18n.language === "en"
        ? await BlogsServices.handleSubmitEn(values)
        : await BlogsServices.handleSubmitAr(values);
      formikBag.resetForm();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formikProps = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema, // Use the dynamically imported validation schema
  });

  return {
    formikProps,
  };
};

export default useForm;
