import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './components/app';
import { ThemeProvider } from './contexts/themeContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  // </React.StrictMode>
);
