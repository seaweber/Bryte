export const activateKey = ( key ) => {
    return {
        type: 'ACTIVATE_KEY',
        pianoKey: key
    }
};

export const deactivateKey = ( key ) => {
    return {
        type: 'DEACTIVATE_KEY',
        pianoKey: key
    }
};
