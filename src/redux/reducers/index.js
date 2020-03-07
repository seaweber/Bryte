const initialState = {
    activeKeys: [ ]
};

// destructure initial state to state because why not i guess
const rootReducer = ( state = initialState, action ) => {

    if ( action.type === 'ACTIVATE_KEY') {

        return {
            ...state,
            activeKeys: [
                ...state.activeKeys,
                action.pianoKey
            ],
        }
    }

    if ( action.type === 'DEACTIVATE_KEY' ) {

        return {
            ...state,
            activeKeys:
                state.activeKeys.filter( key => key !== action.pianoKey ),
        }
    }

    return state;

};

export default rootReducer;
