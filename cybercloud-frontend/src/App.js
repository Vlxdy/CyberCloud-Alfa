import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';

import Terminals from './components/terminals/Terminals'


function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" component={Terminals}/>
    </Router>
  );
}

export default App;
