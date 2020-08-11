import React from 'react';
import './App.css';
import Search from './components/search/search'; 
import Header from './components/header'; 

function App() {
  return (
    <div className="App">
      <Header name="Youtube Api Clone"/>
      <Search/>
    </div>
  );
}

export default App;
