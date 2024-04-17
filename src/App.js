import React from 'react';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';
import ContentFromBoxes from './components/ContentFromBoxes/ContentFromBoxes';
import Form from './components/Form/Form';
import styles from './index.css'; // Import CSS module

function App() {
  
  return (
    <>
      <Navbar />
      <div className="container ">
      <Title/>
      <ContentFromBoxes/>
      <Form/>
      </div>
      <Footer />
    </>
  );
}

export default App;
