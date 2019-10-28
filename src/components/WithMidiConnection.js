import React, { useState, useEffect } from 'react';
import * as Tonal from 'tonal';

function WithMidiConnection ( props ) {

    const [activeKeys, setActiveKeys] = useState([]);

    const activateKey = key => {
        let newState = [...activeKeys];
        newState.push(key);
        setActiveKeys(newState);
    }

    const deactivateKey = key => {
        let newState = [...activeKeys];
        newState = newState.filter(item => key != item);
        setActiveKeys(newState);
    }

    const onMIDIMessage = message => {

        let note = Tonal.Note.fromMidi(message.data[1]);

        // key on
        if (message.data[0] === 144 && message.data[2] > 0) {
            activateKey(note);
        }

        // key off
        if (message.data[0] === 128 || message.data[2] === 0) {
            deactivateKey(note)
        }
    }

    // TODO: Gracefully connect to keyboard that's been connected since before initial render
    function detectAndConnect () {

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
                    console.log(e.port.name, e.port.manufacturer, e.port.state);
                } else {
                    console.error('No access to your midi devices.');
                }

                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    // each time there is a midi message call the onMIDIMessage function
                    input.value.onmidimessage = onMIDIMessage;
                }
            }
            return true;
        }

        function failure () {
            console.error('No access to your midi devices.');
            return false;
        }
        return null;
    }

    useEffect(() => {
        detectAndConnect();
    });

    return (
        <div>
            {   /* Iterate over arbitrary children, passing the state.activeKeys as a prop to each one */
                React.Children.map(props.children, function (child) {
                    return React.cloneElement(child, { activeKeys: activeKeys });
                })
            }
        </div>
    );
}

export default WithMidiConnection;
