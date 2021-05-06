import React, { Component } from 'react';

import './App.css';
import './bootstrap.css'

import BloglistApp  from './components/bloglist/bloglistApp'
 
class App extends Component {
  render() {
    return (
      <div className="App">
        <BloglistApp/>
      </div>
    );
  }
}

export default App;
