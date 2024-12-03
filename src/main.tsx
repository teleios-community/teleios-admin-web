import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

// App styles
import './styles/backgrounds.css';
import './styles/globals.css';
import './styles/table.css';
import './styles/tailwind.css';

// Package styles
import 'react-toastify/dist/ReactToastify.css';
import 'reactjs-popup/dist/index.css';

// Redux Store
import { Provider } from 'react-redux';
import { store } from './store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
