import React, { useState, useEffect } from "react";
import * as Tonal from "tonal"

import "../styles/PianoKeyboard.css";

import Key from "./PianoKey";

function PianoKeyboard ( props ) {

    const [activeKeys, setActiveKeys] = useState(props.activeKeys);

    useEffect( () => {
        setActiveKeys(props.activeKeys);
    }, [props.activeKeys]);

    // TODO: Feed in through props after setup wizard
    let lowestNote = 48, highestNote = 72;

    let blackKeys = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];

    /*
     * Generates a collection of PianoKey components representing
     * the connected midi keyboard from the provided lowest and highest notes
     */
    function generateKeys() {

        let keyboard = new Array(
            ( highestNote - lowestNote ) + 1)
            .fill(undefined)
            .map((item, index) =>

                /*
                 * convert midi note to musical notation
                 * ex: 48 -> C3
                 */
                Tonal.Note.fromMidi(lowestNote + index)
            );

        return keyboard.map(( note ) => {
            return <Key key={note}
                        note={note}
                        active={activeKeys.includes(note)}
                        keyColor={
                            blackKeys.includes(

                                /*
                                 * strip octave number
                                 * ex: C3 -> C
                                 */
                                note.replace(/[0-9]/g, '')
                            ) ? 'blackKey' : 'whiteKey'
                        }
                    />
        });
    }

    return (
        <div className="keyboard">
            { generateKeys() }
        </div>
    )
}

export default PianoKeyboard;