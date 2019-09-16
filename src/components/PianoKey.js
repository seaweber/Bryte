import React, { useState } from "react";
import "../styles/PianoKey.css";
import Granim from './Granim';

function PianoKey ( props ) {

    const [brightness] = useState(props.brightnessMap);

    // conditionally render gradient based on props
    function BrightnessGradient (props) {
        if(brightness[props.note] === true) {
            return <Granim className={`granim-${props.note}`}/>
        }
    }

    return (
        <div className={`key ${props.keyColor}`}>
            {BrightnessGradient(props)}
        </div>
    );

}

export default PianoKey;