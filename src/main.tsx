import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Importing CSS files
import './08.css';
import './24.css';
import './32.css';
import './47.css';
import './69.css';
import './82.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
