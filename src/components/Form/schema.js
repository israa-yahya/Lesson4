import * as yup from "yup";

export const validationSchema = yup.object().shape({
  title: yup.string().required('Please enter your title').max(50, 'Maximum 50 characters allowed').matches(/^[A-Za-z\s]+$/, 'Letters only'),
  description: yup.string().required('Please enter your description').max(500, 'Maximum 500 characters allowed'),
});