import { createRoot } from 'react-dom/client';
import ReactGA from 'react-ga4';
import App from './App.tsx';
import './index.css';

// Initialize GA4 - only in production
if (import.meta.env.PROD) {
  ReactGA.initialize('G-W6RJTD7BWJ');
}

createRoot(document.getElementById('root')!).render(<App />);
