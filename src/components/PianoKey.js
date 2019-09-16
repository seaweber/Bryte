import React, { useState } from "react";
import "../styles/PianoKey.css";
import Granim from './Granim';

function PianoKey ( props ) {

    const [brightness, updateBrightness] = useState(props.brightnessMap);

    function BrightnessGradient (props) {
        if(brightness[props.note] === true) {
            return <Granim className={`granim-${props.note}`}/>
        }
    }

    return (
        <div className={`key ${props.className}`}>
            {BrightnessGradient(props)}
        </div>
    );

}

export default PianoKey;