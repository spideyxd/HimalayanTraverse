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
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
