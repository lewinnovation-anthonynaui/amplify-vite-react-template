import './index.css';

// import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

// import { Authenticator } from '@aws-amplify/ui-react';
import outputs from '../amplify_outputs.json';
import App from './App.tsx';
import store from './store/index.ts';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
