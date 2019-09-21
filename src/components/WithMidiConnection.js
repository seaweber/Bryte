import React from 'react';
import * as Tonal from 'tonal';

class WithMidiConnection extends React.Component {

    constructor(props) {
        super(props);
        this.state = { activeKeys:[] };
    }

    activateKey = key => {
        const newState = this.state;
        newState.activeKeys.push(key);
        this.setState(newState);
    }

    deactivateKey = key => {
        const newState = this.state;
        newState.activeKeys
            = newState.activeKeys
            .filter( item => item !== key);
        this.setState(newState);
    }

    onMIDIMessage = message => {

        let note = Tonal.Note.fromMidi(message.data[1]);

        // key on
        if (message.data[0] === 144 && message.data[2] > 0) {
            this.activateKey(note);
        }

        // key off
        if (message.data[0] === 128 || message.data[2] === 0) {
            this.deactivateKey(note)
        }
    }

    detectAndConnect () {

        let self = this;

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

                for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
                    // each time there is a midi message call the onMIDIMessage function
                    input.value.onmidimessage = self.onMIDIMessage;
                }
            }
            return true;
        }

        function failure () {
            //setMessage('No supported MIDI devices detected...');
            console.error('No access to your midi devices.');
            return false;
        }
        return null;
    }

    componentDidMount() {
        this.detectAndConnect();
    }

    componentWillUnmount() {

    }

    render() {
        let self = this;
        return (
            <div>
                {   /* Iterate over arbitrary children, passing the state.activeKeys as a prop to each one */
                    React.Children.map(this.props.children, function (child) {
                        return React.cloneElement(child, { activeKeys: self.state.activeKeys });
                    })
                }
            </div>
        );
    }
}

export default WithMidiConnection;
