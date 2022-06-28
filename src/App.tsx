import React from 'react';
import logo from './logo.svg';
import './App.css';
import { InputField } from './components/inputField';
import List from './components/searchResult'
function App() {
  
  return (
    <div className="App">
      <InputField/>
      <List/>
    </div>
  );
}

export default App;
