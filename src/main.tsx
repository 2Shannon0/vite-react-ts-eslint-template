import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const rootContainer = document.getElementById('root');

if (!rootContainer) {
    throw new Error();
}

createRoot(rootContainer).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
