/*
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)  
*/

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter, Routes, and Route
import './index.css';
import App from './App.jsx';
import Register from './Register.jsx'; // Import the Register component
import Landingpage from './Landingpage.jsx'; // Import the Landingpage component
import Profile from './Profile.jsx'; // Import the Profile component
import About from './About.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/landingpage" element={<Landingpage />} /> {/* Add your Landingpage component here */}
        <Route path="/profile" element={<Profile />} /> {/* Add your Profile component here */}
        <Route path="/about" element={<About />} /> {/* Add your Profile component here */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
