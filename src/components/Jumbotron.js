import React, { useState, useEffect } from 'react';
import { chord } from 'tonal-detect';
import '../styles/Jumbotron.css';

function Jumbotron( props ) {

    const [activeKeys, setActiveKeys] = useState(props.activeKeys);

    useEffect( () => {
        setActiveKeys(props.activeKeys);
    }, [props.activeKeys]);

    function stripOctaveNumbers( activeKeys ) {
        let formattedKeys = activeKeys.map( note => note.replace(/[0-9]/g, ''));
        return formattedKeys;
    }

    return (
        <div className='jumbotron'>
            {/* chord(stripOctaveNumbers(activeKeys)).join(' ') */}
        </div>
    )
}

export default Jumbotron;
