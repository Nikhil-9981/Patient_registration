// **src/main.tsx** – Removed auto-insert debug code for persistence
import './db';  // Ensure PGlite initialization runs on startup
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import 'reflect-metadata';  // enable decorator metadata for PGlite ORM

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
