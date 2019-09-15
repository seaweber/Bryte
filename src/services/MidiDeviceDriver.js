import synth from './Synthesizer';

function onMIDIMessage (message) {
    let frequency = midiNoteToFrequency(message.data[1]);

    if (message.data[0] === 144 && message.data[2] > 0) {
        synth.playNote(frequency);
    }

    if (message.data[0] === 128 || message.data[2] === 0) {
        synth.stopNote(frequency);
    }
}

function midiNoteToFrequency (note) {
    return Math.pow(2, ((note - 69) / 12)) * 440;
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