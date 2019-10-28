import React, { useEffect } from "react";
import "../styles/PianoKey.css";
import synth from '../services/Synth';

function PianoKey ( props ) {

    const active = props.activeKeys.includes(props.note);
    const backgroundColorStyle = { backgroundColor: active ? 'red' : '' };

    useEffect( () => {
        active ?
           synth.triggerAttackRelease(props.note)
            : synth.triggerRelease(props.note);

        active ?
            console.log(props.note + ' attack')
            : console.log(props.note + ' release');

    }, [active]);

    return (
        <div className={`key ${ props.keyColor }`} style={ backgroundColorStyle }/>
    );
}

export default PianoKey;
