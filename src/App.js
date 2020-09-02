import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './Components/Navbar'
import CreateUser from './Components/CreateUser';
import Render from './Components/Render';

function App() {
  return (
    <div className="App">

      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Switch>

            <Route exact path='/' component={CreateUser} />
            <Route exact path='/view' component={Render} />
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
