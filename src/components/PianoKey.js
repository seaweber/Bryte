import React, { useState, useEffect, useRef } from "react";
import { SizeMe } from 'react-sizeme';
import "../styles/PianoKey.css";
import Granim from './Granim';
import synth from '../services/Synth';

function PianoKey ( props ) {

    const [active, setActive] = useState(props.active);
    const isFirstRun = useRef(true);

    useEffect( () => {
        /* prevent useEffect from running on initial render */
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        props.active ?
           synth.triggerAttack(props.note)
            : synth.triggerRelease(props.note);

        props.active ?
            console.log(props.note + ' attack') : console.log(props.note + ' release');

        setActive(props.active);
    }, [props.active, props.note]);

    /* conditionally render gradient based on state.active */
    function BrightnessGradient (size) {
        if(active) {

            /*
             * Granim is a canvas element under the hood.
             * Canvas elements cannot be sized with CSS.
             * Therefore, pass the width and size of Granim's
             * container (PianoKey) as props.
             */
            return <Granim
                    width={size.width}
                    height={size.height}
                    className={`granim-${props.note}`}
                    />
        }
    }

    /*
     * SizeMe pre-renders an invisible component to determine the size of a container with its contents.
     * This is needed to pass these dimensions down to the Granim element.
     */
    return (
        <SizeMe monitorHeight>
            {
                ({ size }) =>
                    <div className={`key ${props.keyColor}`}>
                        { BrightnessGradient(size) }
                    </div>
            }

        </SizeMe>
    );
}

export default PianoKey;