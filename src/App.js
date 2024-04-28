import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ContentFromBoxes from "./components/ContentFromBoxes/ContentFromBoxes";
import Form from "./components/Form/Form";
import EditBlog from './components/EditBlog/EditBlog';
import styles from'./index.css'
import BlogDetails from "./components/BlogDetails/BlogDetails";

function App() {
  return (
    <Router>
        <Navbar />
      <div className="container ">

        <Routes>
          <Route path="/" element={<ContentFromBoxes />} />
          <Route path="/addBlog" element={<Form />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/editBlog/:id" element={<EditBlog />} /> {/* Route for editing a blog post */}

        </Routes>
</div>
        <Footer />
    </Router>
  );
}

export default App;
