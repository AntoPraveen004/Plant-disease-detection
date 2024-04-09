import React, { useState } from 'react';
import { Link, Routes, Route,useNavigate, Navigate } from 'react-router-dom';
import './views/main.css';
import SignIn from './SignIn';  
import Product from './Product';
import imgPlaceholder from './img/images (2).jpg'; 
import FileUpload from './FileUpload'; 
import Chatbot from './Chatbot'

const Main = () => {
  return (
    <div >
      <header>
        <h2 className="logo">Crop Partner</h2>
        <nav>
          <ul className="ul">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/signIn">Sign Up</Link></li>
            <li><Link to="/chatbot">Chatbot</Link></li>
            <li><Link to="aboutus">About Us</Link></li>
          </ul>
        </nav>
        <button className="contact">Contact Us</button>
      </header>

      <div className="whole">
        <div className="container">
          <div className="box">
  
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </div>
      </div>

      <footer>
        <nav>
          <ul className="foot">
            <li><a href="">Contact Information</a></li>
            <li><button className="fb"></button></li>
            <li><a href="">Terms Of use</a></li>
            <li><a href="">Privacy Policy</a></li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

const Home = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [diseaseName, setDiseaseName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showRecommendationButton, setShowRecommendationButton] = useState(false);
  const imageUrl = uploadedImage ? URL.createObjectURL(uploadedImage) : imgPlaceholder;
  const navigate = useNavigate(); 

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result.split(',')[1];
        const byteCharacters = atob(imageData);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
          byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'image/jpeg' });
        setUploadedImage(blob);
      };
      reader.readAsDataURL(file);
    }
  };

  const detectDisease = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append('image', uploadedImage);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();
      setDiseaseName(data.predicted_class || 'No disease detected');
      setShowRecommendationButton(true); 
    } catch (error) {
      console.error('Error detecting disease:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendationClick = () => {
    navigate('/Tomato_mosaic_virus?query1=  give the tips to cure the tomato mosaic virus  &query2=give the product to solve the tomato mosaic virus');
  };

  return (
    <div className="containers">
      <div className="boxs">
        <FileUpload />
        <form onSubmit={(event) => { event.preventDefault(); detectDisease(); }}>
          <p style={{color:"white"}}>Upload a good quality image:</p>
          <div className="image-container">
            <img src={imageUrl} alt="Uploaded Image" id="uploaded-image" />
          </div>
          <label htmlFor="file" className="file-input-label">
            <b>Click to upload Plant Image</b>
            <input id="file" type="file" className="file-input" onChange={handleFileInputChange} />
          </label><br /><br />
          {showRecommendationButton ? (
            <button type="button" className="detection" onClick={handleRecommendationClick}>
              Recommendation
            </button>
          ) : (
            <button type="submit" className="detection" disabled={!uploadedImage || loading}>
              {loading ? 'Detecting...' : 'Detect Disease'}
            </button>
          )}
        </form>
        {diseaseName && (
          <div className='diseased'>
            <p>Disease Name: {diseaseName}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/signIn" element={<SignIn />} />
      <Route path="*" element={<Navigate to="/" />} />
      <Route path='/Tomato_mosaic_virus' element={<Product/>}/>
      <Route path='/chatbot' element={<Chatbot/>}/>

    </Routes>
  );
};

export default App;
