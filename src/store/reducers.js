const initialState = {
    brightnessMap: {}
}

function brightnessReducer(state = initialState, action) {
    return {
        ...state,
        [action.indexNote]: action.on
    }
}

export default brightnessReducer;