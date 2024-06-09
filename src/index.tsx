import { createRoot } from 'react-dom/client';
import React from 'react';

import { App } from './App';

const container = document.getElementById('root') as HTMLElement;

createRoot(container).render(<App />);
