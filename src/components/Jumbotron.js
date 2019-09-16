import React, { useState } from 'react';
import '../styles/Jumbotron.css';

import driver from '../services/MidiDeviceDriver'

function Jumbotron() {

    const [message, setMessage] = useState('No supported MIDI devices detected...')

    return (
        <div className='jumbotron'>
            {message}
            {driver.detectAndConnect()}
        </div>
    )
}

export default Jumbotron;