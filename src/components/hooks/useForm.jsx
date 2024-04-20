import { useFormik } from 'formik';
import { validationSchema } from '../Form/schema';

function useForm(initialValues, onSubmitCallback) {
  

  const handleSubmit = async (values, formikBag) => {
    
    try {
      await onSubmitCallback(values);
      formikBag.resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,
    validationSchema,
  });

  

  return { onChange:formik.handleChange,  errors:formik.errors, onBlur:formik.handleBlur, 
    touched:formik.touched, values:formik.values, onSubmit:formik.handleSubmit,
  isValid:formik.isValid, isDirty:formik.dirty};
}

export default useForm;