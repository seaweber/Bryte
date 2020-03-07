import React, { useState, useEffect } from 'react';
import * as Tonal from 'tonal';
import { useSelector, useDispatch } from 'react-redux';
import { activateKey, deactivateKey } from '../redux/actions/setActions'

/* Renderless component */

function MidiDeviceDriver ( props ) {

    const [ connected, setConnected ] = useState(false);

    const [ activeKeys, setActiveKeys ] = useState( [ ] );

    const dispatch = useDispatch();

    const onMIDIMessage = message => {

        const note = Tonal.Note.fromMidi( message.data[1] );

        // key on
        if ( message.data[0] === 144 && message.data[2] > 0 ) {
            dispatch( activateKey(note) );
        }

        // key off
        if ( message.data[0] === 128 || message.data[2] === 0 ) {
            dispatch( deactivateKey(note) );
        }
    };

    // TODO: Gracefully connect to keyboard that's been connected since before initial render
    const detectAndConnect = () => {

        const success = ( midi ) => {

            setConnected(() => true);

            // Get lists of available MIDI controllers
            const inputs = midi.inputs.values();
            // const outputs = midi.outputs.values();

            midi.onstatechange = event => {

                if (event.port.state === 'connected') {
                    console.log(event.port.name, event.port.manufacturer, event.port.state);
                } else {
                    console.error('No access to your midi devices.');
                }

                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    // each time there is a midi message call the onMIDIMessage function
                    input.value.onmidimessage = onMIDIMessage;
                }
            };
            return true;
        };

        const failure = () => {
            console.error('No access to your midi devices.');
            return false;
        };

        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess()
                .then(success, failure);
        }

        return null;
    };

    // run successfully only once
    useEffect(() => {
        detectAndConnect();
    }, []);

    return ( null );
}

export default MidiDeviceDriver;
