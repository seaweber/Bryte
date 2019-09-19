import React, { useState } from 'react';
import '../styles/Jumbotron.css';

function Jumbotron() {

    const [message] = useState('No supported MIDI devices detected...')

    return (
        <div className='jumbotron'>
            {message}
        </div>
    )
}

export default Jumbotron;