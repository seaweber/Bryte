import React, { useState, useEffect } from "react";
import { SizeMe } from 'react-sizeme';
import "../styles/PianoKey.css";
import Granim from './Granim';
import { PolySynth } from 'tone';

function PianoKey ( props ) {

    const [active, setActive] = useState(props.active);

    // useEffect( () => {
    //     if(props.active === true && active === false) {
    //         console.log('attack');
    //         synth.triggerAttack(props.note);
    //         setActive(props.active);
    //     }
    //     else if (props.active === false && active === true) {
    //         console.log('release')
    //         synth.triggerRelease(props.note);
    //         setActive(props.active)
    //     }
    // });

    useEffect( () => {
        let synth = new PolySynth().toMaster();
        props.active ?
            synth.triggerAttack(props.note)
            : synth.triggerRelease(props.note);

        props.active ?
            console.log('attack') : console.log('release');

        setActive(props.active);

    }, [props.active, active]);

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