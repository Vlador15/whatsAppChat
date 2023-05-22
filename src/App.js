import './styles/reset.scss';
import './styles/main.scss';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './components/AppRouter.js';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
