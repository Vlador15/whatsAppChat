import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
import UserStore from './store/userStore';

const root = ReactDOM.createRoot(document.getElementById('root'));
export const Context = createContext(null);

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
    }}
  >
    <App />
  </Context.Provider>
);
