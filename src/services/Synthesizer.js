let context = new AudioContext(), oscillators = {};

const Synthesizer = {

    playNote (frequency) {
        oscillators[frequency] = context.createOscillator();
        oscillators[frequency].frequency.value = frequency;
        oscillators[frequency].connect(context.destination);
        oscillators[frequency].start(context.currentTime);
    },

    stopNote (frequency) {
        oscillators[frequency].stop(context.currentTime);
        oscillators[frequency].disconnect();
    }

}

export default Synthesizer;


