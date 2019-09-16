import React, {useState} from "react";
import * as Tonal from "tonal"
import { connect } from 'react-redux';

import "../styles/PianoKeyboard.css";

import Key from "./PianoKey";

const mapStateToProps = state => {
    return { brightnessMap: state.brightnessMap };
};

function PianoKeyboard ( props ) {

    const [brightnessMap] = useState(props.brightnessMap);

    // TODO: Feed in through props after setup wizard
    let lowestNote = 48, highestNote = 72;

    let blackKeys = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];

    /*
     * Generates a collection of keys representing the connected midi keyboard from the provided lowest and highest notes
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
            return <Key note={note}
                        brightnessMap={brightnessMap}
                        keyColor={
                            blackKeys.includes(
                                // strip octave number
                                note.replace(/[0-9]/g, '')
                            ) ? 'blackKey' : 'whiteKey'
                        }
                    />

        });
    }

    return (
        <div className="keyboard">
            {
                generateKeys()

            }
        </div>
    )
}

export default connect(mapStateToProps)(PianoKeyboard);