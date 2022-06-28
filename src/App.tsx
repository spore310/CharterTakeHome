import React from 'react';
import './App.css';
import { InputField } from './components/InputField/inputField';
import List from './components/searchResult'
import InfoCard from './components/InfoCard';
import style from './app.module.css';
function App() {
  
  return (
    <div className="App">
      <InputField/>
      <div className={style.container}> 
        <List/>
        <InfoCard/>
      </div>
    </div>
  );
}

export default App;
