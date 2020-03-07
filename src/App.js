import React from 'react';
import './App.css';

import PianoKeyboard from "./components/PianoKeyboard";
import TheoryCalculator from "./services/TheoryCalculator";
import MidiDeviceDriver from "./components/MidiDeviceDriver";

function App() {

  return (
      <div className="App">

          <MidiDeviceDriver/>

          <PianoKeyboard/>

      </div>
  );
}

export default App;
