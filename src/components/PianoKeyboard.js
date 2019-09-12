import React, { useState, useLayoutEffect } from "react";
import ReactDOM from "react-dom";
import "../styles/PianoKeyboard.css";


import WhiteKey from "./WhiteKey";
import BlackKey from "./BlackKey";

function PianoKeyboard ( props ) {

    const [width, setWidth] = useState(0);

    /*
     * Generates a collection of keys representing the connected midi keyboard
     */
    function generateKeys() {

        /*
         * By convention, keyboards contain, in order, 'n' octaves + 1 white key
         * Calculate connected midi keyboard's number of octaves
         */
        let octaves = ( Number.parseInt(props.keys) - 1 ) / 12;

        let notes = [];

        // iterate through octaves, incrementing octave level
        for (let index = 1; index <= octaves; index++) {
            notes.push(octave(index));
        }
        // add extra white key
        notes.push(<WhiteKey/>);

        return notes;
    }

    /*
     * Produces a collection of <Key> components to represent an octave
     */
    function octave ( level ) {

        // position of black keys in an octave with root C
        const blackKeys = [1, 3, 6, 8, 10];

        // calculate midi code of requested octave's low C
        const midiRoot = level * 12;
        let currentNote = midiRoot;

        let notes = [];

        // iterate through the 12 'half steps' of an octave
        for ( let index = 12; index > 0; index-- ) {

            /*
             * convert each midi code to its C1 (the lowest octave level) equivalent,
             * and compare against blackKeys
             */
            blackKeys.includes(currentNote - midiRoot) ?
                notes.push(1) : notes.push(0);
            currentNote++;
        }

        // convert binary array to collection of <Key> components
        return notes.map( ( note ) => {
            return note === 0 ?
                ( <WhiteKey/> ) :
                ( <BlackKey/> )
        });
    }

    return (
        <div className="keyboard">
            { generateKeys() }
        </div>
    )
}

export default PianoKeyboard;