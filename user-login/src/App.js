import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Login from './components/login/login.js';
import UserPage from './components/pages/UserPage.js';
import PrivateRoute from './components/login/PrivateRoute.js';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
       <h1>Hello</h1>
       <Link to='/'>Home</Link>
       <Link to='/login'>Login</Link>
       <Link to='protected'>Protected</Link>
      </div>
      <Route path='/login' component = {Login} />
      <PrivateRoute exact path='/protected' component={UserPage} />
    </Router>
  );
}

export default App;
