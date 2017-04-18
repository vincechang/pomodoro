import React, { Component } from 'react';
import Clock from './Clock';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Pomodoro Clock</h2>
        </div>
        <Clock />
      </div>
    );
  }
}

export default App;
