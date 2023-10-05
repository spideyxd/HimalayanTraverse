import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Faq from './Component/Faq';
import Contact from './Component/Contact';
import Blogs from './Component/Blogs';
import Nearbytreks from './Component/Nearbytreks';
import Treks from './Component/Treks'; 
import Signup from './Component/Signup';
import Login from './Component/Login';
import Feed from './Component/Feed';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<App/>} />    
        <Route path="faq" element={<Faq/>} />    
        <Route path="contact" element={<Contact/>} />    
        <Route path="blogs" element={<Blogs/>} />    
        <Route path="nearbytreks" element={<Nearbytreks/>} />    
        <Route path="treks" element={<Treks/>} />  
        <Route path="signup" element={<Signup/>}  />  
        <Route path="login" element={<Login/>}  /> 
        <Route path="feed" element={<Feed/>}  /> 
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
