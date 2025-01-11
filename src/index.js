import React from 'react';
import ReactDOM from 'react-dom/client'; // Используем createRoot из React 18
import App from './App';
import './index.css'; // Если у вас есть глобальные стили

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);