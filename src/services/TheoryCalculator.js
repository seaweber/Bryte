import React from 'react';
import { Note, Chord, chord, Distance, scale, transpose, Dictionary } from "tonal";
import * as Key from "tonal-key";
import '../styles/Jumbotron.css';

function TheoryCalculator( props ) {

    const scaleDegreeOf = chord => Key.chords(props.musicKey).indexOf(chord) + 1;

    const chordOfScaleDegree = degree => Key.chords(props.musicKey)[degree - 1];

    const chordScaleFromTonic = chord =>
        Key.chords(this.chord(chord).name) || "";

    const secondaryDominantOf = chord => {
        let { name, quality } = this.chord(chord);
        console.log(name, quality);
        Key.chords(props.musicKey).map(chord =>
            chordScaleFromTonic(`${name} + ${quality}`)[4]);
    };

    /*
     * strips octave number
     * ex: C3 -> C
     */
    const notesStripped
        // <Set> removes duplicates
        // = [...new Set(props.activeKeys.map( note => note.replace(/[0-9]/g, '')))];
        = [...new Set(props.activeKeys.map( note => Note.pc(note)))];

    function calculateChord () {

        const chords = Key.chords(props.musicKey);
        const currentChord
            = chords.filter(
                chord => Chord.notes(chord).every(
        note => notesStripped.includes(note)))[0];

         console.log("CHORD");
         //console.log(currentChord);
         console.log(" ");
         //console.log(chordScaleFromTonic(currentChord));
         console.log(Dictionary.chord(currentChord));

         return (scaleDegreeOf(currentChord));

        // return ` ${currentChord} / ${scaleDegreeOf(currentChord)}`;
    };

    return (
        <div>
            <p>{ calculateChord() }</p>
        </div>
    )
}

export default TheoryCalculator;
