import React from 'react';
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from './App.jsx';
import './index.css';
import { Toaster } from 'react-hot-toast';

const toastConfig = {
  duration: 2000,
  position: 'bottom-center',
};
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/*" element={<App />} />
      </Routes>
    </Router>
    <Toaster toastOptions={toastConfig} />
  </React.StrictMode>,
);
