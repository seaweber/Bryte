import { PolySynth } from 'tone';

const synth = new PolySynth({
    "oscillator": {
        "type": "amtriangle",
        "harmonicity": 0.5,
        "modulationType": "sine"
    },
    "envelope": {
        "attackCurve": "exponential",
        "attack": 0.05,
        "decay": 0.2,
        "sustain": 0.2,
        "release": 1.5,
    },
    "portamento": 0.05
}).toMaster();

export default synth;