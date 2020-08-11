import React from 'react';
import './App.css';
import Search from './components/search/search'; 
import Header from './components/header'; 
import Comments from './components/comments/comments'; 

function App() {
  return (
    <div className="App">
      <Header name="Youtube Api Clone"/>
      <Search/>
      <Comments/>
    </div>
  );
}

export default App;
