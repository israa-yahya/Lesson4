import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
// import Navbar from "./components/Navbar/Navbar";
// import Footer from "./components/Footer/Footer";
import ContentFromBoxes from "./components/ContentFromBoxes/ContentFromBoxes";
import Form from "./components/Form/Form";
import EditBlog from "./components/EditBlog/EditBlog";
import styles from "./index.css";
import BlogDetails from "./components/BlogDetails/BlogDetails";
import RootLayout from "./layouts/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
      <Route index element={<ContentFromBoxes />} />
      <Route path="addBlog" element={<Form />} />
      <Route path="blog/:id" element={<BlogDetails />} />
      <Route path="editBlog/:id" element={<EditBlog />} />{" "}
      {/* Route for editing a blog post */}
    </Route>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
