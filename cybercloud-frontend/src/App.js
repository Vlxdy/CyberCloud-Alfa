import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navigation from './components/Navigation';

import Terminals from './components/terminals/Terminals'

import Items from './components/items/Items'

import Adminitem from './components/items/Adminitem'


function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={Terminals}/>
        <Route path="/items" component={Items}/>
        <Route path="/adminitem" component={Adminitem} />
      </div>
    </Router>
  );
}

export default App;
