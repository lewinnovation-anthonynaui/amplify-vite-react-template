import './index.css';

// import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import React from 'react';
import ReactDOM from 'react-dom/client';

// import { Authenticator } from '@aws-amplify/ui-react';
import outputs from '../amplify_outputs.json';
import App from './App.tsx';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <Authenticator> */}
    {/* <App /> */}
    {/* </Authenticator> */}
    <App />
  </React.StrictMode>
);
