import { useFormik } from 'formik';
import { validationSchema } from '../components/Form/schema';
import BlogsServices from '../services/Blogs';

const  useForm = ()=> {

  const initialValues = {

    title: "",
    description: "",
    liked: 0,
    unliked: 0,
  };

  const handleSubmit = async (values, formikBag) => {
    try {
      await BlogsServices.handleSubmit(values);
      formikBag.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const formikProps = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  return {
   formikProps,
  };
}

export default useForm;
