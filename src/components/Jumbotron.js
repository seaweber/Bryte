import React, { useState, useEffect } from 'react';
//import * as Tonal from 'tonal';
import '../styles/Jumbotron.css';

function Jumbotron( props ) {

    const [activeKeys, setActiveKeys]
        = useState(props.activeKeys);

    useEffect( () => {
        setActiveKeys(props.activeKeys);
    }, [props.activeKeys]);

    // function inferChord( activeKeys ) {
    //     return Tonal.chord(Tonal.PcSet.chroma(activeKeys));
    // }

    return (
        <div className='jumbotron'>
            {activeKeys}
        </div>
    )
}

export default Jumbotron;