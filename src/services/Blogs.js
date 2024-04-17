export function fetchAndDisplayBlogs() {
  fetch("http://localhost:3000/blogs")
    .then((response) => response.json())
    .catch((error) => console.error("Error fetching blogs:", error));
}

export function deleteBlog(id) {
  return fetch(`http://localhost:3000/blogs/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete blog");
      }
      // Refresh the displayed blogs after successful deletion
      fetchAndDisplayBlogs();
    })
    .catch((error) => console.error("Error deleting blog:", error));
}
