// useForm.js
import { useState } from 'react';

const useForm = ({ initialValues, onSubmit, validationSchema }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      await validationSchema.validate(values, { abortEarly: false });
      await onSubmit(values);
      setValues(initialValues);
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }

    setIsSubmitting(false);
  };

  return {
    values,
    errors,
    handleChange,
    handleSubmit,
    isSubmitting,
  };
};

export default useForm;
