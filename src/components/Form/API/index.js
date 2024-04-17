export const submitForm = (values, actions) => {
    fetch('http://localhost:3000/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (response.ok) {
          // Refresh the displayed blogs, assuming it's a separate function
          // refreshBlogs();
          actions.resetForm();
        } else {
          throw new Error('Failed to add new blog');
        }
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        actions.setSubmitting(false);
      });
  };