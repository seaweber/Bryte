import React from 'react';
import './App.css';

import PianoKeyboard from "./components/PianoKeyboard";
import Jumbotron from "./components/Jumbotron";
import WithMidiConnection from "./components/WithMidiConnection";

function App() {

  return (
      <div className="App">

          { /* Wrap piano in order to propagate midi events */ }
          <WithMidiConnection>
              <PianoKeyboard/>
              <Jumbotron/>
          </WithMidiConnection>
      </div>
  );
}

export default App;