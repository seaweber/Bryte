import React from 'react';
import './App.css';


import PianoKeyboard from "./components/PianoKeyboard"
import Jumbotron from "./components/Jumbotron";

function App() {
  return (
    <div className="App">
        <Jumbotron/>
        <PianoKeyboard keys="25"/>
    </div>
  );
}

export default App;