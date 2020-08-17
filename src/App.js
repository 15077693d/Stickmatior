import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Main from './pages/main/main'
function App() {
  return (
    <div className="App">
    <Router>
      <Route exact path ="/">
        <Main/>
      </Route>
    </Router>
    </div>
  );
}

export default App;
