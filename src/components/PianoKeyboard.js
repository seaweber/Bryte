import React, {useState} from "react";
import * as Tonal from "tonal"
import { connect } from 'react-redux';

import "../styles/PianoKeyboard.css";

import Key from "./PianoKey";
import store from "../store/store";

const mapStateToProps = state => {
    return { brightnessMap: state.brightnessMap };
};

function PianoKeyboard ( props ) {

    const [brightnessMap, updateBrightnessMap] = useState(props.brightnessMap);

    let lowestNote = 48, highestNote = 72;

    let blackKeys = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];

    /*
     * Generates a collection of keys representing the connected midi keyboard from the provided lowest and highest notes
     */
    function generateKeys() {

        let keyboard = new Array(
            (highestNote - lowestNote) + 1)
            .fill(undefined)
            .map((item, index) =>
                Tonal.Note.fromMidi(lowestNote + index)
            );
        return keyboard;
    }

    return (
        <div className="keyboard">
            {
                generateKeys()
                    .map(( note ) => {
                        return <Key note={note}
                            brightnessMap={brightnessMap}
                            className={
                                blackKeys.includes(
                                    note.replace(/[0-9]/g, '')
                                ) ? 'blackKey' : 'whiteKey'
                            }
                        />

                    })
            }
        </div>
    )
}

export default connect(mapStateToProps)(PianoKeyboard);