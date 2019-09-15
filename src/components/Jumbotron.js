import React, { useState } from 'react';
import '../styles/Jumbotron.css';
import Granim from './Granim';

import driver from '../services/MidiDeviceDriver'

function Jumbotron() {

    const [message, setMessage] = useState('No supported MIDI devices detected...')

    return (
        <div className='jumbotron'>
            {message}
            {driver.detectAndConnect()}
            <Granim id="granim"/>
        </div>
    )
}

export default Jumbotron;