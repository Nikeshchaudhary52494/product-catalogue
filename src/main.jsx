import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

const toastConfig = {
  duration: 2000,
  position: 'bottom-center',
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    <Toaster toastOptions={toastConfig} />
  </React.StrictMode>,
);
