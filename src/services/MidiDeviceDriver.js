import Synth from './Synthesizer';
import * as Tonal from "tonal"
import { TOGGLE_BRIGHTNESS } from "../store/actions";
import store from '../store/store';

// redux dispatch
function sendBrightnessUpdate(note, on) {
    store.dispatch({type: TOGGLE_BRIGHTNESS, note, on})
}


function onMIDIMessage (message) {
    let frequency = Tonal.Note.midiToFreq(message.data[1]);
    let note = Tonal.Note.fromMidi(message.data[1]);

    // key on
    if (message.data[0] === 144 && message.data[2] > 0) {
        Synth.playNote(frequency);
        sendBrightnessUpdate(note, true);
    }

    // key off
    if (message.data[0] === 128 || message.data[2] === 0) {
        Synth.stopNote(frequency);
        sendBrightnessUpdate(note, false);
    }
}

const MidiDeviceDriver = {

    detectAndConnect () {

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(success, failure);
        }

        function success (midi) {

            // Get lists of available MIDI controllers
            const inputs = midi.inputs.values();
            // const outputs = midi.outputs.values();

            midi.onstatechange = function(e) {

                if (e.port.state === 'connected') {
                    //setMessage(`${e.port.manufacturer} ${e.port.name} ${e.port.state}`);
                    console.log(e.port.name, e.port.manufacturer, e.port.state);
                } else {
                    //setMessage('No supported MIDI devices detected...');
                    console.error('No access to your midi devices.');
                }

                for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
                    // each time there is a midi message call the onMIDIMessage function
                    input.value.onmidimessage = onMIDIMessage;
                }
            }


        }

        function failure () {
            //setMessage('No supported MIDI devices detected...');
            console.error('No access to your midi devices.');
        }


        return null;
    }

}

export default MidiDeviceDriver;