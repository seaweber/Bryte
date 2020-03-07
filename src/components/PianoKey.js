import React, { useEffect } from "react";
import "../styles/PianoKey.css";
import synth from '../services/Synth';

function PianoKey ( props ) {

    useEffect( () => {
        props.active ?
           synth.triggerAttackRelease(props.note)
            : synth.triggerRelease(props.note);

        props.active ?
            console.log(props.note + ' attack')
            : console.log(props.note + ' release');

    }, [props.active]);

    return (
        <div
            className={`key ${ props.keyColor }`}
            style={{ backgroundColor: props.active ? 'red' : '' }} />
    );
}

export default PianoKey;
